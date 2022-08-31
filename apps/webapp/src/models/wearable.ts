import * as yup from "yup";
import { armorShape } from "./armor";
import { Item, itemShape } from "./item";
import { STATUS_EFFECT } from "./status-effect";
import { DiceUnit, diceUnitFormModel, DistanceUnit, TimeUnit } from "./units";
import { weaponShape } from "./weapon";

export type Wearable = {
  aoe: DistanceUnit;
  heal: DiceUnit;
  reduceCooldown: TimeUnit;
  damage: DiceUnit;
  armor: DiceUnit;
  ammo: DiceUnit[];
  statusEffect: STATUS_EFFECT;
  range: number;
  movement: number;
} & Item;

export const wearableShape = {
  heal: diceUnitFormModel.required(),
  aoe: yup.number().required(),
  reduceCooldown: yup.number().required(),
};

export const wearableFormModel = yup.object().shape({
  ...itemShape,
  ...armorShape,
  ...weaponShape,
  ...wearableShape,
});

export interface WearableFormModel extends yup.InferType<typeof wearableFormModel> {}
