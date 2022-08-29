import { AffinityStat } from "@affinity-rpg/models/affinity";
import { ARMOR_CLASSIFICATION, Armor, ArmorFormModel } from "@affinity-rpg/models/armor";
import { ELEMENT } from "@affinity-rpg/models/element";
import { ITEM_TYPE } from "@affinity-rpg/models/item";
import { RATING } from "@affinity-rpg/models/rating";
import { createItem } from "./item";

export const decorateArmorWithModifiers = (armor: Armor): Armor & { defaultArmorPoints: number } => {
  const decoratedArmor = { ...armor, defaultArmorPoints: 0 };
  decoratedArmor.defaultArmorPoints = getDefaultArmorPointsFromRating(armor.rating);
  return decoratedArmor;
};

export const getArmorPoints = (armor: Armor) => {
  let cost = 0;
  cost += Math.max(armor.armor.modifier, 0) * 5;
  cost += Math.max(Math.trunc(armor.movement / 5), 0) * 10;
  if (armor.element !== ELEMENT.PHYSICAL) {
    cost += 5;
  }
  armor.affinityStats.forEach((stat) => {
    cost += Math.abs(stat.stat) * 10;
  });
  if (armor.permanentEffect.length > 0) {
    cost += 10;
  }
  if (armor.masteryId) {
    cost += 15;
  }
  return cost;
};

export const getDefaultArmorPointsFromRating = (rating: RATING) => {
  switch (rating.toUpperCase()) {
    case RATING.COMMON:
      return 10;
    case RATING.UNCOMMON:
      return 20;
    case RATING.RARE:
      return 30;
    case RATING.LEGENDARY:
      return 40;
    default:
      return 0;
  }
};

export const getDefaultArmorDefense = (armor: Pick<Armor, "rating" | "classification">) => {
  let ratingModifier = 0;
  let classificationModifier = 0;
  switch (armor.rating.toUpperCase()) {
    case RATING.COMMON:
      ratingModifier = 0;
      break;
    case RATING.UNCOMMON:
      ratingModifier = 2;
      break;
    case RATING.RARE:
      ratingModifier = 4;
      break;
    case RATING.LEGENDARY:
      ratingModifier = 6;
      break;
    default:
      ratingModifier = 0;
  }
  switch (armor.classification.toUpperCase()) {
    case ARMOR_CLASSIFICATION.LIGHT:
      classificationModifier = 1;
      break;
    case ARMOR_CLASSIFICATION.MEDIUM:
      classificationModifier = 3;
      break;
    case ARMOR_CLASSIFICATION.HEAVY:
      classificationModifier = 5;
      break;
  }
  return Math.trunc(classificationModifier * (ratingModifier + 1) + ratingModifier);
};

export const createArmor = (): Armor => ({
  ...createItem(ITEM_TYPE.ARMOR),
  armor: {
    diceCount: 1,
    modifier: 0,
  },
  classification: ARMOR_CLASSIFICATION.MEDIUM,
  movement: 0,
});

export const armorFromFormModel = (formModel: ArmorFormModel): Armor => ({
  ...formModel,
  id: "",
  type: ITEM_TYPE.ARMOR,
  equipped: formModel.equipped ?? false,
  rating: formModel.rating as RATING,
  classification: formModel.classification as ARMOR_CLASSIFICATION,
  element: (formModel.element as ELEMENT) ?? ELEMENT.PHYSICAL,
  permanentEffect: formModel.permanentEffect ?? "",
  weaponSlotsUsed: formModel.weaponSlotsUsed as 0 | 1 | 2,
  affinityStats: formModel.affinityStats.map(
    (stat) =>
      ({
        stat: stat.stat,
        affinity: stat.affinity,
      } as AffinityStat),
  ),
});
