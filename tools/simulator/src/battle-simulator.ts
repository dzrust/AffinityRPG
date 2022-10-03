import {
  createArmor,
  createTestHero,
  createTestNPC,
  createWeapon,
  resistanceRoll,
  rollD6,
  rollDamage,
  skillRoll,
} from "@affinity-rpg/helpers";
import { AFFINITY, Armor, Hero, NPC, Weapon, WEAPON_CLASSIFICATION } from "@affinity-rpg/models";
import * as R from "ramda";
type HeroWithWeaponsAndArmor = {
  weapons: Weapon[];
  armor: Armor[];
  initiative: number;
  isHostile: false;
} & Hero;

type NPCWithWeaponsAndArmor = {
  weapons: Weapon[];
  armor: Armor[];
  initiative: number;
  isHostile: true;
} & NPC;

type Combatant = HeroWithWeaponsAndArmor | NPCWithWeaponsAndArmor;

const NUMBER_OF_COMBAT = 1000;

export const AFFINITY_COMBINATIONS = [
  { affinity: AFFINITY.POTENCY, secondaryAffinity: AFFINITY.POTENCY },
  { affinity: AFFINITY.POTENCY, secondaryAffinity: AFFINITY.FINESSE },
  { affinity: AFFINITY.POTENCY, secondaryAffinity: AFFINITY.VIGOR },
  { affinity: AFFINITY.FINESSE, secondaryAffinity: AFFINITY.POTENCY },
  { affinity: AFFINITY.FINESSE, secondaryAffinity: AFFINITY.FINESSE },
  { affinity: AFFINITY.FINESSE, secondaryAffinity: AFFINITY.VIGOR },
  { affinity: AFFINITY.VIGOR, secondaryAffinity: AFFINITY.POTENCY },
  { affinity: AFFINITY.VIGOR, secondaryAffinity: AFFINITY.FINESSE },
  { affinity: AFFINITY.VIGOR, secondaryAffinity: AFFINITY.VIGOR },
];

const addWeaponAndArmorToCombatant = (combatant: Combatant, index: number) => {
  if (index % 3 == 0) {
    const weapon1 = createWeapon();
    weapon1.weaponSlotsUsed = 1;
    weapon1.classification = WEAPON_CLASSIFICATION.ONE_HANDED;
    weapon1.damage = { diceCount: 2, modifier: 0 };
    const weapon2 = createWeapon();
    weapon2.weaponSlotsUsed = 1;
    weapon2.classification = WEAPON_CLASSIFICATION.ONE_HANDED;
    weapon2.damage = { diceCount: 2, modifier: 0 };
    combatant.weapons = [weapon1, weapon2];
  } else {
    const weapon1 = createWeapon();
    weapon1.weaponSlotsUsed = 2;
    weapon1.classification = WEAPON_CLASSIFICATION.TWO_HANDED;
    weapon1.damage = { diceCount: 3, modifier: 0 };
    combatant.weapons = [weapon1];
  }
  const armor = createArmor();
  armor.armor.modifier = (index % 4) + 1;
  combatant.armor = [armor];
};

const createParty = (numberOfPartyMembers: number, level: number) => {
  const party = [];
  for (let i = 0; i < numberOfPartyMembers; i++) {
    const randomIndex = Math.trunc(Math.random() * AFFINITY_COMBINATIONS.length);
    const partyMember: Combatant = {
      ...createTestHero(
        AFFINITY_COMBINATIONS[randomIndex].affinity,
        AFFINITY_COMBINATIONS[randomIndex].secondaryAffinity,
      )(level),
      weapons: [],
      armor: [],
      initiative: 0,
      isHostile: false,
    };
    partyMember.initiative = rollD6(partyMember.finesse).total;
    addWeaponAndArmorToCombatant(partyMember, i);
    party.push(partyMember);
  }
  return party;
};

const createHostileNPCParty = (numberOfPartyMembers: number, level: number) => {
  const party = [];
  for (let i = 0; i < numberOfPartyMembers; i++) {
    const randomIndex = Math.trunc(Math.random() * AFFINITY_COMBINATIONS.length);
    const partyMember: Combatant = {
      ...createTestNPC(
        AFFINITY_COMBINATIONS[randomIndex].affinity,
        AFFINITY_COMBINATIONS[randomIndex].secondaryAffinity,
      )(level),
      weapons: [],
      armor: [],
      initiative: 0,
      isHostile: true,
    };
    partyMember.initiative = rollD6(partyMember.finesse).total;
    addWeaponAndArmorToCombatant(partyMember, i);
    party.push(partyMember);
  }
  return party;
};

const runTurn = (current: Combatant, target: Combatant) => {
  const bleedDamageRoll = rollD6(1);
  if (current.currentHealth <= 0) {
    return;
  }
  const attack1 = attack(current, target);
  const attack2 = attack(current, target);
  return {
    current: { ...current },
    target: { ...target },
    attack1,
    attack2,
    bleedDamageRoll,
  };
};

const getTargetFromParty = (party: Combatant[]) => {
  const aliveParty = party.filter((partyMember) => partyMember.currentHealth > 0);
  return aliveParty[Math.trunc(Math.random() * aliveParty.length)];
};

const attack = (current: Combatant, target: Combatant) => {
  const weaponAttacks: any[] = [];
  current.weapons.forEach((weapon) => {
    if (target.currentHealth <= 0) {
      return;
    }
    const finesseRoll = skillRoll(current.finesse);
    let damage = 0,
      resistance = 0;
    let bleedApplied = false;
    if (finesseRoll.success) {
      damage = rollDamage(weapon.damage.diceCount).total;
      damage += (finesseRoll.criticalRolls > 0 ? current.crit : 0) + current.damage;
      R.forEach<number>(
        (value) => R.add(value, resistance),
        R.map((armor) => armor.armor.modifier, target.armor),
      );
      resistance = resistanceRoll(target.vigor).resistanceTotal;
      target.currentHealth -= Math.max(damage - resistance, 0);
    }
    weaponAttacks.push({
      finesseRoll,
      damage,
      damageDice: weapon.damage.diceCount,
      trueDamage: Math.max(damage - resistance, 0),
      resistance,
      bleedApplied,
      targetName: target.name,
      targetCurrentHP: target.currentHealth,
    });
  });

  return weaponAttacks;
};

const runCombat = (party: Combatant[], hostileParty: Combatant[]) => {
  const turnOrder = [...party, ...hostileParty].sort((turnerA, turnerB) => turnerB.initiative - turnerA.initiative);

  let turn = 1;
  let turns = [];
  do {
    const turnsTaken = [];
    const turnOrderSnapshot = turnOrder.map((taker) => ({ ...taker }));
    for (let i = 0, { length } = turnOrder; i < length; i++) {
      let target = getTargetFromParty(hostileParty);
      if (turnOrder[i].isHostile) {
        target = getTargetFromParty(party);
      }
      if (target === undefined) {
        break;
      }
      turnsTaken.push(runTurn(turnOrder[i], target));
    }

    turns.push({
      turn,
      turnOrder: turnOrderSnapshot,
      turnsTaken,
    });
    turn += 1;
  } while (
    hostileParty.filter((h) => h.currentHealth > 0).length > 0 &&
    party.filter((p) => p.currentHealth > 0).length > 0
  );
  const isHostileWin = hostileParty.filter((h) => h.currentHealth > 0).length > 0;
  return {
    turns,
    turnCount: turn,
    hostilesDead: hostileParty.filter((h) => h.currentHealth <= 0).length,
    partyDead: party.filter((h) => h.currentHealth <= 0).length,
    hostileWon: isHostileWin,
    partyWon: !isHostileWin,
  };
};

export const runCombatRounds = (
  partySize: number,
  hostilePartySize: number,
  partyLevel: number,
  hostilePartyLevel: number,
) => {
  const party = createParty(partySize, partyLevel);
  console.log(
    "Party",
    party.map((pm) => ({
      affinity: pm.affinity,
      potency: pm.potency,
      vigor: pm.vigor,
      finesse: pm.finesse,
      health: pm.totalHealth,
      damage: pm.damage,
      crit: pm.crit,
    })),
  );
  const hostileParty = createHostileNPCParty(hostilePartySize, hostilePartyLevel);
  console.log(
    "Hostile Party",
    hostileParty.map((pm) => ({
      affinity: pm.affinity,
      potency: pm.potency,
      vigor: pm.vigor,
      finesse: pm.finesse,
      health: pm.totalHealth,
      damage: pm.damage,
      crit: pm.crit,
    })),
  );
  const results = [];
  let hostileWins = 0;
  let partyWins = 0;
  let turnCount = 0;
  let hostileFatality = 0;
  let partyFatality = 0;

  for (let i = 0; i < NUMBER_OF_COMBAT; i++) {
    const result = runCombat(R.clone(party), R.clone(hostileParty));
    hostileWins += result.hostileWon ? 1 : 0;
    partyWins += result.partyWon ? 1 : 0;
    turnCount += result.turnCount;
    hostileFatality += result.hostilesDead;
    partyFatality += result.partyDead;
    results.push(result);
  }
  const finalResult = {
    results,
    hostileWinPercentage: (100 * hostileWins) / NUMBER_OF_COMBAT,
    partyWinPercentage: (100 * partyWins) / NUMBER_OF_COMBAT,
    averageTurnCount: turnCount / NUMBER_OF_COMBAT,
    averageHostileFatalities: hostileFatality / NUMBER_OF_COMBAT,
    averagePartyFatalities: partyFatality / NUMBER_OF_COMBAT,
  };
  //console.log(JSON.stringify(finalResult));

  console.log("Hostile Win %", finalResult.hostileWinPercentage);
  console.log("Party Win %", finalResult.partyWinPercentage);
  console.log("Average turns", finalResult.averageTurnCount);
  console.log("Average Hostile Fatalities", finalResult.averageHostileFatalities);
  console.log("Average Party Fatalities", finalResult.averagePartyFatalities);
};
