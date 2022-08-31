import * as yup from "yup";
import { AffinityStat, affinityStatFormModel } from "./affinity";
import { ELEMENT, ELEMENTS } from "./element";
import { RATING, RATINGS } from "./rating";

export enum ITEM_TYPE {
  WEAPON = "WEAPON",
  ARMOR = "ARMOR",
  WEARABLE = "WEARABLE",
  ITEM = "ITEM",
}

export type Item = {
  id: string;
  name: string;
  type: ITEM_TYPE;
  equipped: boolean;
  rating: RATING;
  affinityStats: AffinityStat[];
  element: ELEMENT;
  permanentEffect: string;
  description: string;
  masteryId?: string;
  weaponSlotsUsed: 0 | 1 | 2;
};

export const itemShape = {
  name: yup.string().required(),
  equipped: yup.bool(),
  rating: yup.string().oneOf(RATINGS).required(),
  affinityStats: yup.array(affinityStatFormModel).required(),
  permanentEffect: yup.string(),
  element: yup.string().oneOf(ELEMENTS),
  description: yup.string().required(),
  weaponSlotsUsed: yup.number().oneOf([0, 1, 2]).required(),
};

export const itemFormModel = yup.object().shape(itemShape);

export interface ItemFormModel extends yup.InferType<typeof itemFormModel> {}
