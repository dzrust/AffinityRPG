import * as yup from "yup";
import { Item, itemShape } from "./item";
import { STATUS_EFFECT, STATUS_EFFECTS } from "./status-effect";
import { DiceUnit, diceUnitFormModel, DistanceUnit } from "./units";

export enum WEAPON_CLASSIFICATION {
  ONE_HANDED = "ONE_HANDED",
  TWO_HANDED = "TWO_HANDED",
  AMMO = "AMMO",
}

export const WEAPON_CLASSIFICATIONS: WEAPON_CLASSIFICATION[] = Object.keys(WEAPON_CLASSIFICATION).map(
  (key) => (WEAPON_CLASSIFICATION as any)[key],
);

export type Weapon = {
  classification: WEAPON_CLASSIFICATION;
  damage: DiceUnit;
  statusEffect: STATUS_EFFECT;
  range: DistanceUnit;
  ammo: DiceUnit[];
  tempEffect: string;
} & Item;

export const weaponShape = {
  damage: diceUnitFormModel.required(),
  classification: yup.string().oneOf(WEAPON_CLASSIFICATIONS).required(),
  statusEffect: yup.string().oneOf(STATUS_EFFECTS),
  tempEffect: yup.string(),
  range: yup.number().min(0),
  ammo: yup.array(),
};

export const weaponFormModel = yup.object().shape({
  ...itemShape,
  ...weaponShape,
});

export interface WeaponFormModel extends yup.InferType<typeof weaponFormModel> {}
