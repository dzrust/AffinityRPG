import * as yup from "yup";
import { ROLL_STATUS, STATUS_EFFECT } from "./status-effect";

export enum SKILL {
  ART = "ART",
  ATHLETICS = "ATHLETICS",
  COMMUNICATE = "COMMUNICATE",
  COOK = "COOK",
  CRAFT = "CRAFT",
  ENGINEERING = "ENGINEERING",
  EXPLORE = "EXPLORE",
  HUNT = "HUNT",
  KNOWLEDGE = "KNOWLEDGE",
  PERFORM = "PERFORM",
  SCIENCE = "SCIENCE",
  SENSE = "SENSE",
  STRATEGY = "STRATEGY",
}

export enum DIFFICULTY {
  EVERY_DAY_TASK = "EVERY_DAY_TASK",
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
  VERY_HARD = "VERY_HARD",
  LEGENDARY = "LEGENDARY",
}

export const SKILLS = Object.keys(SKILL).map((skillKey) => (SKILL as any)[skillKey]);

export const DIFFICULTIES = Object.keys(DIFFICULTY).map((difficultyKey) => (DIFFICULTY as any)[difficultyKey]);

export type SkillState = {
  skill: SKILL;
  rollStatus: ROLL_STATUS;
  modifier: number;
};

export const skillStateFormModel = yup.object().shape({
  skill: yup.string().oneOf(SKILLS).required(),
  rollStatus: yup.string().oneOf([STATUS_EFFECT.ADVANTAGE, STATUS_EFFECT.DISADVANTAGE, STATUS_EFFECT.NONE]).required(),
  modifier: yup.number().required(),
});

export interface SkillStateFormModel extends yup.InferType<typeof skillStateFormModel> {}
