import * as yup from "yup";
import { AFFINITIES, AFFINITY } from "./affinity";
import { Level, levelArray } from "./level";
import { DistanceUnit } from "./units";
import { VISIBILITY } from "./visibility";
import { SKILLS, SkillState } from "./skills";

export enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export const GENDERS: GENDER[] = Object.keys(GENDER).map((key) => (GENDER as any)[key]);

export type Hero = {
  id: string;
  userId: string;
  visibility: VISIBILITY;
  name: string;
  race: string;
  heroClass: string;
  gender: GENDER;
  job?: string;
  affinity: AFFINITY;
  freeAffnityStats: number;
  experience: number;
  baseMovement: DistanceUnit;
  level: Level;
  totalHealth: number;
  currentHealth: number;
  potency: number;
  finesse: number;
  vigor: number;
  money: number;
  backstory: string;
  skills: SkillState[];
  maxims: string[];
  quirks: string[];
  habits: string[];
  strengths: string[];
  weaknesses: string[];
};

export enum STAGES {
  INTRO = "intro",
  JOB = "job",
  MASTERY = "mastery",
  INVENTORY = "inventory",
  HISTORY = "history",
  CONFIRMATION = "confirmation",
}

export const heroIntroFormModel = yup.object().shape({
  name: yup.string().required(),
  race: yup.string().required(),
  gender: yup.string().oneOf(GENDERS).required(),
  baseMovement: yup.number().min(1).required(),
  affinity: yup.string().oneOf(AFFINITIES).required(),
});

export interface HeroIntroFormModel extends yup.InferType<typeof heroIntroFormModel> {}

export const heroJobFormModel = yup.object().shape({
  heroClass: yup.string().required(),
  level: yup.number().oneOf(levelArray).required(),
  experience: yup.number().min(0).max(355000),
  job: yup.string(),
  skills: yup.array().of(yup.string().oneOf(SKILLS).required()).required().length(2),
});

export interface HeroJobFormModel extends yup.InferType<typeof heroJobFormModel> {}

export const heroMasteryFormModel = yup.object().shape({
  hp: yup.number().min(1).max(999999).required(),
  currentHp: yup.number().min(1).max(999999).required().max(yup.ref("hp")),
  potency: yup.number().min(1).max(100).required(),
  finesse: yup.number().min(1).max(100).required(),
  vigor: yup.number().min(1).max(100).required(),
});

export interface HeroMasteryFormModel extends yup.InferType<typeof heroMasteryFormModel> {}

export const heroInventoryFormModel = yup.object().shape({
  money: yup.number().required(),
});

export interface HeroInventoryFormModel extends yup.InferType<typeof heroInventoryFormModel> {}

export const heroHistoryFormModel = yup.object().shape({
  backstory: yup.string(),
  maxims: yup.array(yup.string()),
  quirks: yup.array(yup.string()),
  habits: yup.array(yup.string()),
  strengths: yup.array(yup.string()),
  weaknesses: yup.array(yup.string()),
});

export interface HeroHistoryFormModel extends yup.InferType<typeof heroHistoryFormModel> {}
