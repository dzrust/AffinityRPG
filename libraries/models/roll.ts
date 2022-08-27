import * as yup from "yup";
import { RATING } from "./rating";
import { STATUS_RATING } from "./status-effect";

export type DiceFaceType = 1 | 2 | 3 | 4 | 5 | 6;
export const rollLookup = {
  1: -2,
  2: -1,
  3: 0,
  4: 1,
  5: 2,
  6: 3,
};

export const resistanceRollLookup = {
  1: -2,
  2: -1,
  3: 0,
  4: 1,
  5: 2,
  6: 3,
};

export enum ROLL_TYPES {
  ROLL,
  SKILL_ROLL,
  HIT_ROLL,
  RESISTANCE_ROLL,
  RATING_ROLL,
  STATUS_EFFECT,
}

export type Roll = {
  total: number;
  results: DiceFaceType[];
};

export type SkillRoll = {
  skillTotal: number;
  success: boolean;
  diceLost: number;
  criticalRolls: number;
} & Roll;

export type ResistanceRoll = {
  resistanceTotal: number;
} & Roll;

export type RollSeries<T> = {
  rolls: SkillRoll[];
  result: T;
};

export type RatingRoll = RollSeries<RATING>;

export type StatusEffectRoll = RollSeries<STATUS_RATING>;

export type SkillRollSeries = RollSeries<boolean>;

export type RollNotification = {
  id: string;
  result: boolean | RATING | STATUS_RATING | number;
  diceLost: number;
  criticalRolls: number;
  type: ROLL_TYPES;
  message: string;
};

export const diceRollFormModel = yup.object().shape({
  numberOfDice: yup.number().min(1).required(),
  rollType: yup.number().oneOf([ROLL_TYPES.RESISTANCE_ROLL, ROLL_TYPES.ROLL, ROLL_TYPES.SKILL_ROLL]).required(),
});

export interface DiceRollFormModelType extends yup.InferType<typeof diceRollFormModel> {}
