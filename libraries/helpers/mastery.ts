import { ELEMENT } from "@affinity-rpg/models/element";
import { Mastery, MASTERY_CLASSIFICATION, MASTERY_TYPE } from "@affinity-rpg/models/mastery";
import { STATUS_EFFECT } from "@affinity-rpg/models/status-effect";

export const createMastery = (): Mastery => ({
  id: "",
  name: "New Mastery",
  classification: MASTERY_CLASSIFICATION.MASTERY,
  type: MASTERY_TYPE.ACTIVE,
  aoe: 0,
  cooldown: 2,
  currentCooldown: 0,
  armor: {
    diceCount: 0,
    modifier: 0,
  },
  damage: {
    diceCount: 0,
    modifier: 0,
  },
  heal: {
    diceCount: 0,
    modifier: 0,
  },
  distance: 5,
  duration: 0,
  element: ELEMENT.PHYSICAL,
  statusEffect: STATUS_EFFECT.NONE,
  affinityStats: [],
  permanentEffect: "",
  tempEffect: "",
  reduceCooldown: 0,
  description: "",
});

export const getMasteryCost = (mastery: Mastery): number => {
  let cost = 0;
  cost += Math.max(mastery.aoe, 0) * 5;
  cost += Math.max(mastery.damage.diceCount, 0) * 3;
  cost += Math.max(mastery.armor.modifier, 0) * 3;
  cost += Math.max(mastery.heal.diceCount, 0) * 4;
  cost += Math.max(Math.round((mastery.distance - 5) / 5), 0) * 1;
  cost += Math.max(mastery.duration, 0) * 2;
  if (mastery.element !== ELEMENT.PHYSICAL) {
    cost += 3;
  }
  if (mastery.statusEffect !== STATUS_EFFECT.NONE) {
    cost += 3;
  }
  mastery.affinityStats.forEach((stat) => {
    cost += Math.abs(stat.stat) * 5;
  });
  if (mastery.permanentEffect.length > 0) {
    cost += 10;
  }
  if (mastery.tempEffect.length > 0) {
    cost += 4;
  }
  cost += Math.max(mastery.reduceCooldown, 0) * 10;
  return cost;
};
