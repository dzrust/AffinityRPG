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
import {
  AFFINITY,
  Armor,
  DamageRoll,
  Hero,
  NPC,
  ResistanceRoll,
  Roll,
  SkillRoll,
  Weapon,
  WEAPON_CLASSIFICATION,
} from "@affinity-rpg/models";
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

type Round = {
  roundNumber: number;
  hit: SkillRoll;
  damage: {
    weaponDamage: Roll[];
    criticalDamage: DamageRoll;
    potencyDamage: DamageRoll;
    totalDamage: number;
  };
  resistance: {
    armorResistance: number[];
    resistance: ResistanceRoll;
    totalResistace: number;
  };
  health: Roll;
  currentHealth: number;
  totalHealth: number;
};

type RoundsResult = {
  rounds: Round[];
  roundsLasted: number;
  combatant: Combatant;
  damageAverage: number;
  damageMax: number;
  damageMin: number;
  hitAverage: number;
  resistanceAverage: number;
  critAverage: number;
};

const NUMBER_OF_COMBAT = 1000;
const NUMBER_OF_ROUNDS = 10;

const AFFINITY_COMBINATIONS = [
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

const addWeaponAndArmorToCombatant = (
  combatant: Combatant,
  weaponDice: number,
  weaponModifier: number,
  isDualWield: boolean,
  armorModifier: number,
) => {
  if (isDualWield) {
    const weapon1 = createWeapon();
    weapon1.weaponSlotsUsed = 1;
    weapon1.classification = WEAPON_CLASSIFICATION.ONE_HANDED;
    weapon1.damage = { diceCount: weaponDice, modifier: weaponModifier };
    const weapon2 = createWeapon();
    weapon2.weaponSlotsUsed = 1;
    weapon2.classification = WEAPON_CLASSIFICATION.ONE_HANDED;
    weapon2.damage = { diceCount: weaponDice, modifier: weaponModifier };
    combatant.weapons = [weapon1, weapon2];
  } else {
    const weapon1 = createWeapon();
    weapon1.weaponSlotsUsed = 2;
    weapon1.classification = WEAPON_CLASSIFICATION.TWO_HANDED;
    weapon1.damage = { diceCount: weaponDice, modifier: weaponModifier };
    combatant.weapons = [weapon1];
  }
  const armor = createArmor();
  armor.armor.modifier = armorModifier;
  combatant.armor = [armor];
};

const createHeroCombatant = (
  level: number,
  affinityComination: { affinity: AFFINITY; secondaryAffinity: AFFINITY },
  weaponDice: number,
  weaponModifier: number,
  isDualWield: boolean,
  armorModifier: number,
): Combatant => {
  const combatant: Combatant = {
    ...createTestHero(affinityComination.affinity, affinityComination.secondaryAffinity)(level),
    weapons: [],
    armor: [],
    initiative: 0,
    isHostile: false,
  };
  combatant.initiative = rollD6(combatant.finesse).total;
  addWeaponAndArmorToCombatant(combatant, weaponDice, weaponModifier, isDualWield, armorModifier);
  return combatant;
};

const getDamage = (combatant: Combatant, criticals: number) => {
  let totalDamage = 0;
  const weaponDamage: Roll[] = [];
  combatant.weapons.forEach((weapon) => {
    const roll = rollD6(weapon.damage.diceCount);
    totalDamage += roll.total;
    weaponDamage.push(roll);
  });
  const potencyDamage = rollDamage(combatant.potency);
  totalDamage += potencyDamage.damageTotal;
  const criticalDamage = rollDamage(criticals);
  totalDamage += criticalDamage.damageTotal;
  return {
    weaponDamage,
    criticalDamage,
    potencyDamage,
    totalDamage,
  };
};

const getResistance = (combatant: Combatant) => {
  let totalResistace = 0;
  const armorResistance: number[] = [];
  combatant.armor.forEach((armor) => {
    armorResistance.push(armor.armor.modifier);
    totalResistace += armor.armor.modifier;
  });
  const resistance = resistanceRoll(combatant.vigor);
  totalResistace += resistance.resistanceTotal;
  return {
    armorResistance,
    resistance,
    totalResistace,
  };
};

const getHit = (combatant: Combatant) => {
  return skillRoll(combatant.finesse);
};

const runTest = (combatant: Combatant, difficulty: number): RoundsResult => {
  const rounds = [];
  let roundNumber = 1;
  let damageMax = 0;
  let damageMin = Number.MAX_SAFE_INTEGER;
  let damageAverage = 0;
  let hitAverage = 0;
  let resistanceAverage = 0;
  let critAverage = 0;
  do {
    const hit = getHit(combatant);
    let criticals = 0;
    if (hit.success) {
      hitAverage++;
      criticals = hit.criticalRolls;
      if (criticals > 0) {
        critAverage++;
      }
    }
    const damage = getDamage(combatant, criticals);
    if (damage.totalDamage > damageMax) {
      damageMax = damage.totalDamage;
    }
    if (damage.totalDamage < damageMin) {
      damageMin = damage.totalDamage;
    }
    damageAverage += damage.totalDamage;
    const resistance = getResistance(combatant);
    resistanceAverage += resistance.totalResistace;
    const health = rollD6(difficulty);
    combatant.currentHealth -= Math.max(health.total - resistance.resistance.resistanceTotal, 0);
    rounds.push({
      roundNumber,
      hit,
      damage,
      resistance,
      health,
      currentHealth: combatant.currentHealth,
      totalHealth: combatant.totalHealth,
    });
    roundNumber++;
  } while (combatant.currentHealth > 0 && roundNumber <= NUMBER_OF_ROUNDS);
  return {
    rounds,
    roundsLasted: roundNumber,
    combatant,
    damageAverage: damageAverage / roundNumber,
    damageMax,
    damageMin,
    hitAverage: hitAverage / roundNumber,
    resistanceAverage: resistanceAverage / roundNumber,
    critAverage: critAverage / roundNumber,
  };
};

export const runGaugeifierSimulation = async () => {
  const combatant = createHeroCombatant(20, AFFINITY_COMBINATIONS[0], 2, 0, true, 2);
  let promises: Promise<RoundsResult>[] = [];
  const results: RoundsResult[] = [];
  for (let i = 1; i <= NUMBER_OF_COMBAT; i++) {
    if (i % 50 === 0) {
      results.push(...(await Promise.all(promises)));
      promises = [];
    } else {
      promises.push(
        new Promise((resolve) => {
          const result = runTest(R.clone(combatant), 1);
          resolve(result);
        }),
      );
    }
  }
  results.push(...(await Promise.all(promises)));
  promises = [];
  let roundsLastedAverage = 0;
  let damageMax = 0;
  let damageMin = Number.MAX_SAFE_INTEGER;
  let damageAverage = 0;
  let hitAverage = 0;
  let resistanceAverage = 0;
  let critAverage = 0;
  results.forEach((result) => {
    roundsLastedAverage += result.roundsLasted / NUMBER_OF_ROUNDS;
    if (result.damageMax > damageMax) {
      damageMax = result.damageMax;
    }
    if (result.damageMin < damageMin) {
      damageMin = result.damageMin;
    }
    damageAverage += result.damageAverage;
    hitAverage += result.hitAverage;
    critAverage += result.critAverage;
    resistanceAverage += result.resistanceAverage;
  });
  console.log(
    "How long did I stay alive on average",
    Math.trunc((roundsLastedAverage * 10) / NUMBER_OF_COMBAT),
    "rounds",
  );
  console.log("What was my max damage", damageMax);
  console.log("What was my min damage", damageMin);
  console.log("What was my average damage", Math.round(damageAverage / NUMBER_OF_COMBAT));
  console.log("How often did I hit", Math.trunc((hitAverage * 100) / NUMBER_OF_COMBAT), "%");
  console.log("How much did I resist on average", Math.trunc(resistanceAverage / NUMBER_OF_COMBAT));
  console.log("How often did I crit", Math.trunc((critAverage * 100) / NUMBER_OF_COMBAT), "%");
};
