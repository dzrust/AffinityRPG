import * as yup from "yup";

export type DistanceUnit = number;

export type TimeUnit = number;

export type MoneyUnit = number;

export type MasteryPoint = number;

export type ItemPoint = number;

export type DiceUnit = {
  diceCount: number;
  modifier: number;
};

export const diceUnitFormModel = yup.object().shape({
  diceCount: yup.number().required().min(0),
  modifier: yup.number().required().min(0),
});

export interface DiceUnitFormModel extends yup.InferType<typeof diceUnitFormModel> {}
