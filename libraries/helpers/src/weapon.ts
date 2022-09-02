import { AffinityStat } from "@affinity-rpg/models";
import { ELEMENT } from "@affinity-rpg/models";
import { ITEM_TYPE } from "@affinity-rpg/models";
import { RATING } from "@affinity-rpg/models";
import { STATUS_EFFECT } from "@affinity-rpg/models";
import { DiceUnit } from "@affinity-rpg/models";
import { WeaponFormModel, Weapon, WEAPON_CLASSIFICATION } from "@affinity-rpg/models";
import { createItem } from "./item";

export const weaponFromFormModel = (formModel: WeaponFormModel): Weapon => ({
  ...formModel,
  damage: {
    diceCount: formModel?.damage?.diceCount ?? 0,
    modifier: formModel?.damage?.modifier ?? 0,
  },
  id: "",
  type: ITEM_TYPE.WEAPON,
  equipped: formModel.equipped ?? false,
  statusEffect: `${formModel.statusEffect ?? STATUS_EFFECT.NONE}`.toUpperCase() as STATUS_EFFECT,
  range: formModel.range ?? 0,
  ammo: (formModel.ammo ?? []).map(({ diceCount, modifier }) => ({ diceCount, modifier } as DiceUnit)),
  rating: `${formModel.rating ?? RATING.COMMON}`.toUpperCase() as RATING,
  classification: `${
    formModel.classification ?? WEAPON_CLASSIFICATION.ONE_HANDED
  }`.toUpperCase() as WEAPON_CLASSIFICATION,
  element: `${(formModel.element as ELEMENT) ?? ELEMENT.PHYSICAL}`.toUpperCase() as ELEMENT,
  permanentEffect: formModel.permanentEffect ?? "",
  weaponSlotsUsed: formModel.weaponSlotsUsed as 0 | 1 | 2,
  tempEffect: formModel.tempEffect ?? "",
  affinityStats: formModel.affinityStats.map(
    (stat) =>
      ({
        stat: stat.stat,
        affinity: `${stat.affinity}`.toUpperCase(),
      } as AffinityStat),
  ),
});

export const createWeapon = (): Weapon => ({
  ...createItem(ITEM_TYPE.WEAPON),
  damage: {
    diceCount: 1,
    modifier: 0,
  },
  classification: WEAPON_CLASSIFICATION.ONE_HANDED,
  statusEffect: STATUS_EFFECT.NONE,
  range: 5,
  ammo: [],
  weaponSlotsUsed: 1,
  tempEffect: "",
});

export const decorateWeaponWithModifiers = (weapon: Weapon): Weapon & { defaultPoints: number } => {
  const decoratedArmor = { ...weapon, defaultPoints: 0 };
  decoratedArmor.defaultPoints = getDefaultWeaponPointsFromRating(weapon);
  return decoratedArmor;
};

export const getWeaponPoints = (weapon: Weapon) => {
  let cost = 0;
  cost += Math.max(weapon.damage.diceCount, 0) * 5;
  cost += Math.max(Math.trunc((weapon.range - 5) / 5), 0) * 1;
  if (weapon.statusEffect !== STATUS_EFFECT.NONE) {
    cost += 10;
  }
  if (weapon.element.toUpperCase() !== ELEMENT.PHYSICAL) {
    cost += 5;
  }
  weapon.affinityStats.forEach((stat) => {
    cost += Math.abs(stat.stat) * 10;
  });
  if (weapon.permanentEffect.length > 0) {
    cost += 10;
  }
  if (weapon.tempEffect.length > 0) {
    cost += 10;
  }
  if (weapon.masteryId) {
    cost += 15;
  }
  return cost;
};

export const getDefaultWeaponPointsFromRating = (weapon: Pick<Weapon, "rating" | "classification">) => {
  let basePoints = 0;
  switch (weapon.rating.toUpperCase()) {
    case RATING.COMMON:
      basePoints = 10;
      break;
    case RATING.UNCOMMON:
      basePoints = 20;
      break;
    case RATING.RARE:
      basePoints = 30;
      break;
    case RATING.LEGENDARY:
      basePoints = 40;
      break;
    default:
      basePoints = 0;
      break;
  }
  if (weapon.classification.toUpperCase() === WEAPON_CLASSIFICATION.AMMO) {
    basePoints /= 2;
  }
  if (weapon.classification.toUpperCase() === WEAPON_CLASSIFICATION.TWO_HANDED) {
    basePoints += 5;
  }
  return basePoints;
};

export const getDefaultWeaponDamage = (weapon: Pick<Weapon, "rating" | "classification">) => {
  let damage = 0;
  switch (weapon.rating.toUpperCase()) {
    case RATING.COMMON:
      damage = 1;
      break;
    case RATING.UNCOMMON:
      damage = 2;
      break;
    case RATING.RARE:
      damage = 3;
      break;
    case RATING.LEGENDARY:
      damage = 4;
      break;
    default:
      damage = 1;
  }
  if (weapon.classification.toUpperCase() === WEAPON_CLASSIFICATION.AMMO) {
    damage = Math.round(damage / 2);
  }
  if (weapon.classification.toUpperCase() === WEAPON_CLASSIFICATION.TWO_HANDED) {
    damage += 1;
  }
  return damage;
};
