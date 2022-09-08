import {
  AFFINITIES,
  AFFINITY,
  BASE_HERO_HEALTH_MODIFIER,
  GENDER,
  Hero,
  Level,
  LevelUp,
  VISIBILITY,
} from "@affinity-rpg/models";
import { createLevelUp, levelUp } from "./level";
import { rollHealth } from "./roll";

export const createHero = (): Hero => ({
  id: "",
  userId: "",
  visibility: VISIBILITY.private,
  name: "New Hero",
  race: "",
  heroClass: "",
  gender: GENDER.MALE,
  job: "",
  affinity: AFFINITY.POTENCY,
  baseMovement: 25,
  experience: 0,
  level: 1,
  totalHealth: 0,
  currentHealth: 0,
  potency: 1,
  finesse: 1,
  vigor: 1,
  money: 0,
  backstory: "",
  skills: [],
  maxims: [],
  quirks: [],
  habits: [],
  strengths: [],
  weaknesses: [],
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
});

export const getNumberOfSkillDiceByHeroLevel = (hero: Hero) => {
  return Math.trunc(hero.level / 2) + 1;
};

export const createTestHero = (affinity: AFFINITY, secondaryAffinity: AFFINITY) => (level: number) => {
  let affinities = [...AFFINITIES];
  const hero = createHero();
  hero.affinity = affinity;
  increaseAffinity(hero, affinity);
  increaseAffinity(hero, affinity);
  increaseAffinity(hero, secondaryAffinity);
  hero.totalHealth = rollHealth(hero.vigor).healthTotal + BASE_HERO_HEALTH_MODIFIER;
  hero.currentHealth = hero.totalHealth;
  let lastAffinityIndex = affinities.findIndex((affinity) => affinity === secondaryAffinity);
  for (let i = 1; i != level; i++) {
    levelUp(hero, BASE_HERO_HEALTH_MODIFIER, affinities[lastAffinityIndex], []);
    const levelup = hero.levels[i as Level];
    const affinity = affinities[lastAffinityIndex].toLocaleLowerCase();
    if (levelup[affinity as keyof LevelUp] > 0) {
      if ((hero[affinity as keyof Hero] ?? 0) >= 10) {
        affinities = affinities.filter((a) => a !== affinities[lastAffinityIndex]);
      }
      lastAffinityIndex = (lastAffinityIndex + 1) % affinities.length;
    }
  }
  return hero;
};

const increaseAffinity = (hero: Hero, affinity: AFFINITY) => {
  switch (affinity) {
    case AFFINITY.FINESSE:
      hero.finesse++;
      break;
    case AFFINITY.POTENCY:
      hero.potency++;
      break;
    case AFFINITY.VIGOR:
      hero.vigor++;
      break;
  }
};
