import { ITEM_TYPE } from "@affinity-rpg/models";
import { STATUS_EFFECT } from "@affinity-rpg/models";
import { Wearable } from "@affinity-rpg/models";
import { createItem } from "./item";

export const createWearable = (): Wearable => ({
  ...createItem(ITEM_TYPE.WEARABLE),
  damage: {
    diceCount: 0,
    modifier: 0,
  },
  armor: {
    diceCount: 0,
    modifier: 0,
  },
  heal: {
    diceCount: 0,
    modifier: 0,
  },
  ammo: [],
  aoe: 0,
  reduceCooldown: 0,
  statusEffect: STATUS_EFFECT.NONE,
  range: 5,
  movement: 0,
});
