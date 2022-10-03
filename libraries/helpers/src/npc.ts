import {
  AFFINITIES,
  AFFINITY,
  BASE_NPC_HEALTH_MODIFIER,
  GENDER,
  Level,
  LevelUp,
  NPC,
  NPC_STATE,
  RATING,
} from "@affinity-rpg/models";
import { createLevelUp, levelUp } from "./level";
import { rollHealth } from "./roll";

export const createNPC = (): NPC => ({
  id: "",
  name: "New Hero",
  race: "",
  gender: GENDER.MALE,
  affinity: AFFINITY.POTENCY,
  baseMovement: 25,
  baseHealth: 15,
  level: 1,
  totalHealth: 1,
  currentHealth: 1,
  potency: 1,
  finesse: 1,
  vigor: 1,
  skills: [],
  state: NPC_STATE.NEUTRAL,
  rating: RATING.COMMON,
  description: "",
  experienceEarned: 0,
  levels: {
    1: createLevelUp(),
    2: createLevelUp(),
    3: createLevelUp(),
    4: createLevelUp(),
    5: createLevelUp(),
    6: createLevelUp(),
    7: createLevelUp(),
    8: createLevelUp(),
    9: createLevelUp(),
    10: createLevelUp(),
    11: createLevelUp(),
    12: createLevelUp(),
    13: createLevelUp(),
    14: createLevelUp(),
    15: createLevelUp(),
    16: createLevelUp(),
    17: createLevelUp(),
    18: createLevelUp(),
    19: createLevelUp(),
    20: createLevelUp(),
  },
  damage: 0,
  crit: 0,
});

export const createTestNPC = (affinity: AFFINITY, secondaryAffinity: AFFINITY) => (level: number) => {
  let affinities = [...AFFINITIES];
  const npc = createNPC();
  npc.affinity = affinity;
  increaseAffinity(npc, affinity);
  increaseAffinity(npc, affinity);
  increaseAffinity(npc, secondaryAffinity);
  npc.totalHealth = rollHealth(npc.vigor).healthTotal + BASE_NPC_HEALTH_MODIFIER;
  npc.currentHealth = npc.totalHealth;
  let lastAffinityIndex = affinities.findIndex((affinity) => affinity === secondaryAffinity);
  for (let i = 1; i != level; i++) {
    levelUp(npc, BASE_NPC_HEALTH_MODIFIER, affinities[lastAffinityIndex], []);
    const levelup = npc.levels[i as Level];
    const affinity = affinities[lastAffinityIndex].toLocaleLowerCase();
    if (levelup[affinity as keyof LevelUp] > 0) {
      if (npc[affinity as keyof NPC] >= 10) {
        affinities = affinities.filter((a) => a !== affinities[lastAffinityIndex]);
      }
      lastAffinityIndex = (lastAffinityIndex + 1) % affinities.length;
    }
  }
  return npc;
};

const increaseAffinity = (npc: NPC, affinity: AFFINITY) => {
  switch (affinity) {
    case AFFINITY.FINESSE:
      npc.finesse++;
      break;
    case AFFINITY.POTENCY:
      npc.potency++;
      break;
    case AFFINITY.VIGOR:
      npc.vigor++;
      break;
  }
};

export const createTestPPNPC = createTestNPC(AFFINITY.POTENCY, AFFINITY.POTENCY);
export const createTestPFNPC = createTestNPC(AFFINITY.POTENCY, AFFINITY.FINESSE);
export const createTestPVNPC = createTestNPC(AFFINITY.POTENCY, AFFINITY.VIGOR);

export const createTestFFNPC = createTestNPC(AFFINITY.FINESSE, AFFINITY.FINESSE);
export const createTestFPNPC = createTestNPC(AFFINITY.FINESSE, AFFINITY.POTENCY);
export const createTestFVNPC = createTestNPC(AFFINITY.FINESSE, AFFINITY.VIGOR);

export const createTestVVNPC = createTestNPC(AFFINITY.VIGOR, AFFINITY.VIGOR);
export const createTestVFNPC = createTestNPC(AFFINITY.VIGOR, AFFINITY.FINESSE);
export const createTestVPNPC = createTestNPC(AFFINITY.VIGOR, AFFINITY.POTENCY);
