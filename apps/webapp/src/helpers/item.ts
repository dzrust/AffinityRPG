import { AFFINITY } from "../models/affinity";
import { Armor, ARMOR_CLASSIFICATION } from "../models/armor";
import { ELEMENT } from "../models/element";
import { Item, ITEM_TYPE } from "../models/item";
import { RATING } from "../models/rating";

export const createItem = (type: ITEM_TYPE = ITEM_TYPE.ITEM): Item => ({
  id: "",
  name: "New Item",
  type,
  equipped: false,
  rating: RATING.COMMON,
  affinityStats: [],
  permanentEffect: "",
  element: ELEMENT.PHYSICAL,
  description: "",
  weaponSlotsUsed: 0,
});

export const getDefaultArmorMovement = (item: Pick<Armor, "rating" | "classification">) => {
  if (
    item.rating.toUpperCase() !== RATING.LEGENDARY &&
    item.classification.toUpperCase() === ARMOR_CLASSIFICATION.LIGHT
  ) {
    return 5;
  }
  if (
    item.rating.toUpperCase() === RATING.LEGENDARY &&
    item.classification.toUpperCase() === ARMOR_CLASSIFICATION.LIGHT
  ) {
    return 10;
  }
  if (
    [RATING.LEGENDARY, RATING.RARE].includes(item.rating.toUpperCase() as any) &&
    item.classification.toUpperCase() === ARMOR_CLASSIFICATION.HEAVY
  ) {
    return -5;
  }
  if (
    ![RATING.LEGENDARY, RATING.RARE].includes(item.rating.toUpperCase() as any) &&
    item.classification.toUpperCase() === ARMOR_CLASSIFICATION.HEAVY
  ) {
    return -10;
  }
  return 0;
};

export const getItemModifiers = (items: Item[]) => {
  let movementModifier = 0,
    potencyModifier = 0,
    finesseModifier = 0,
    vigorModifier = 0;
  items.forEach((item) => {
    if (!item.equipped) return;
    if (item.type === ITEM_TYPE.ARMOR) {
      const defaultItemMovement = getDefaultArmorMovement(item as Armor);
      movementModifier += (item as Armor).movement + defaultItemMovement;
    }
    item.affinityStats.forEach((stat) => {
      if (stat.affinity === AFFINITY.FINESSE) {
        finesseModifier += stat.stat;
      }
      if (stat.affinity === AFFINITY.POTENCY) {
        potencyModifier += stat.stat;
      }
      if (stat.affinity === AFFINITY.VIGOR) {
        vigorModifier += stat.stat;
      }
    });
  });
  return {
    movementModifier,
    potencyModifier,
    finesseModifier,
    vigorModifier,
  };
};
