import * as yup from "yup";
import { AffinityStat, affinityStatFormModel } from "./affinity";
import { ELEMENT, ELEMENTS } from "./element";
import { STATUS_EFFECT, STATUS_EFFECTS } from "./status-effect";
import { DiceUnit, diceUnitFormModel, DistanceUnit, TimeUnit } from "./units";

export enum MASTERY_CLASSIFICATION {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  INNATE = "INNATE",
  MASTERY = "MASTERY",
}

export const MASTERY_CLASSIFICATIONS: MASTERY_CLASSIFICATION[] = Object.keys(MASTERY_CLASSIFICATION).map(
  (key) => (MASTERY_CLASSIFICATION as any)[key],
);

export enum MASTERY_TYPE {
  PASSIVE = "PASSIVE",
  ACTIVE = "ACTIVE",
}

export const MASTERY_TYPES: MASTERY_TYPE[] = Object.keys(MASTERY_TYPE).map((key) => (MASTERY_TYPE as any)[key]);

export type Mastery = {
  id: string;
  name: string;
  classification: MASTERY_CLASSIFICATION;
  type: MASTERY_TYPE;
  aoe: DistanceUnit;
  cooldown: TimeUnit;
  currentCooldown: TimeUnit;
  armor: DiceUnit;
  damage: DiceUnit;
  heal: DiceUnit;
  distance: DistanceUnit;
  duration: TimeUnit;
  element: ELEMENT;
  statusEffect: STATUS_EFFECT;
  affinityStats: AffinityStat[];
  permanentEffect: string;
  tempEffect: string;
  reduceCooldown: TimeUnit;
  description: string;
};

export const masteryFormModel = yup.object().shape({
  name: yup.string().required(),
  classification: yup.string().oneOf(MASTERY_CLASSIFICATIONS).required(),
  type: yup.string().oneOf(MASTERY_TYPES).required(),
  aoe: yup.number().required(),
  cooldown: yup.number().required().min(2),
  armor: diceUnitFormModel.required(),
  damage: diceUnitFormModel.required(),
  heal: diceUnitFormModel.required(),
  distance: yup.number().min(0).required(),
  duration: yup.number().min(0).required(),
  element: yup.string().oneOf(ELEMENTS).required(),
  statusEffect: yup.string().oneOf(STATUS_EFFECTS).required(),
  affinityStats: yup.array(affinityStatFormModel).required(),
  permanentEffect: yup.string(),
  tempEffect: yup.string(),
  reduceCooldown: yup.number().required(),
  description: yup.string(),
});

export interface MasteryFormModel extends yup.InferType<typeof masteryFormModel> {}
