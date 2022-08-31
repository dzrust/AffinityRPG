import { AFFINITY } from "../models/affinity";
import { GENDER, Hero } from "../models/hero";
import { VISIBILITY } from "../models/visibility";

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
  freeAffnityStats: 0,
  baseMovement: 25,
  experience: 0,
  level: 1,
  totalHealth: 1,
  currentHealth: 1,
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
});

export const getNumberOfSkillDiceByHeroLevel = (hero: Hero) => {
  return Math.trunc(hero.level / 2) + 1;
};
