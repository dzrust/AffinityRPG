import * as yup from "yup";
import { Item, itemShape } from "./item";
import { DiceUnit, diceUnitFormModel, DistanceUnit } from "./units";

export enum ARMOR_CLASSIFICATION {
  LIGHT = "LIGHT",
  MEDIUM = "MEDIUM",
  HEAVY = "HEAVY",
}

export const ARMOR_CLASSIFICATIONS: ARMOR_CLASSIFICATION[] = Object.keys(ARMOR_CLASSIFICATION).map(
  (key) => (ARMOR_CLASSIFICATION as any)[key],
);

export type Armor = {
  classification: ARMOR_CLASSIFICATION;
  armor: DiceUnit;
  movement: DistanceUnit;
} & Item;

export const armorShape = {
  classification: yup.string().oneOf(ARMOR_CLASSIFICATIONS).required(),
  armor: diceUnitFormModel.required(),
  movement: yup.number().required(),
};

export const armorFormModel = yup.object().shape({
  ...itemShape,
  ...armorShape,
});

export interface ArmorFormModel extends yup.InferType<typeof armorFormModel> {}
