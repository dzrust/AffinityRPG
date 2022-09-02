import { ARMOR_CLASSIFICATION } from "@affinity-rpg/models";
import { ELEMENT } from "@affinity-rpg/models";
import { MASTERY_CLASSIFICATION } from "@affinity-rpg/models";
import { RATING } from "@affinity-rpg/models";
import { SKILL, DIFFICULTY } from "@affinity-rpg/models";
import { STATUS_EFFECT, STATUS_RATING } from "@affinity-rpg/models";
import { WEAPON_CLASSIFICATION } from "@affinity-rpg/models";

export const getElementText = (element: ELEMENT) => {
  switch (element) {
    case ELEMENT.FIRE:
      return "Fire";
    case ELEMENT.ICE:
      return "Ice";
    case ELEMENT.LIGHT:
      return "Light";
    case ELEMENT.PHYSICAL:
      return "Physical";
    case ELEMENT.POISON:
      return "Poison";
    case ELEMENT.SHADOW:
      return "Shadow";
    case ELEMENT.THUNDER:
      return "Thunder";
    case ELEMENT.TIME:
      return "Time";
  }
};

export const getArmorClassificationText = (classification: ARMOR_CLASSIFICATION): string => {
  switch (classification) {
    case ARMOR_CLASSIFICATION.HEAVY:
      return "Heavy";
    case ARMOR_CLASSIFICATION.MEDIUM:
      return "Medium";
    case ARMOR_CLASSIFICATION.LIGHT:
      return "Light";
  }
};

export const getRatingText = (rating: RATING) => {
  switch (rating) {
    case RATING.FAILURE:
      return "Failure";
    case RATING.COMMON:
      return "Common";
    case RATING.UNCOMMON:
      return "Uncommon";
    case RATING.RARE:
      return "Rare";
    case RATING.LEGENDARY:
      return "Legendary";
  }
};

export const getLabelForSkill = (skill: SKILL) => {
  switch (skill) {
    case SKILL.ART:
      return "Art";
    case SKILL.ATHLETICS:
      return "Athletics";
    case SKILL.COMMUNICATE:
      return "Communicate";
    case SKILL.COOK:
      return "Cook";
    case SKILL.CRAFT:
      return "Craft";
    case SKILL.ENGINEERING:
      return "Engineering";
    case SKILL.EXPLORE:
      return "Explore";
    case SKILL.HUNT:
      return "Hunt";
    case SKILL.KNOWLEDGE:
      return "Knowledge";
    case SKILL.PERFORM:
      return "Perform";
    case SKILL.SCIENCE:
      return "Science";
    case SKILL.SENSE:
      return "Sense";
    case SKILL.STRATEGY:
      return "Strategy";
  }
};

export const getLabelForSkillDifficulty = (difficulty: DIFFICULTY) => {
  switch (difficulty) {
    case DIFFICULTY.EVERY_DAY_TASK:
      return "Every Day Task";
    case DIFFICULTY.EASY:
      return "Easy";
    case DIFFICULTY.MEDIUM:
      return "Medium";
    case DIFFICULTY.HARD:
      return "Hard";
    case DIFFICULTY.VERY_HARD:
      return "Very Hard";
    case DIFFICULTY.LEGENDARY:
      return "Legendary";
  }
};

export const getStatusEffectText = (statusEffect: STATUS_EFFECT) => {
  switch (statusEffect) {
    case STATUS_EFFECT.ADVANTAGE:
      return "Advantage";
    case STATUS_EFFECT.BLEED:
      return "Bleed";
    case STATUS_EFFECT.BURN:
      return "Burn";
    case STATUS_EFFECT.DISADVANTAGE:
      return "Disadvantage";
    case STATUS_EFFECT.HASTE:
      return "Haste";
    case STATUS_EFFECT.HIDDEN:
      return "Hidden";
    case STATUS_EFFECT.NONE:
      return "None";
    case STATUS_EFFECT.POISON:
      return "Poison";
    case STATUS_EFFECT.REGEN:
      return "Regen";
    case STATUS_EFFECT.SHIELD:
      return "Shield";
    case STATUS_EFFECT.SHOCK:
      return "Shock";
    case STATUS_EFFECT.SLOW:
      return "Slow";
  }
};

export const getStatusRatingText = (statusRating: STATUS_RATING) => {
  switch (statusRating) {
    case STATUS_RATING.COMMON:
      return "Common";
    case STATUS_RATING.UNCOMMON:
      return "Uncommon";
    case STATUS_RATING.RARE:
      return "Rare";
    case STATUS_RATING.LEGENDARY:
      return "Legendary";
  }
};

export const getWeaponClassificationText = (classification: WEAPON_CLASSIFICATION) => {
  switch (classification) {
    case WEAPON_CLASSIFICATION.AMMO:
      return "Ammo";
    case WEAPON_CLASSIFICATION.ONE_HANDED:
      return "One Handed";
    case WEAPON_CLASSIFICATION.TWO_HANDED:
      return "Two Handed";
  }
};

export const getMasteryClassificationText = (classification: MASTERY_CLASSIFICATION) => {
  switch (classification) {
    case MASTERY_CLASSIFICATION.INNATE:
      return "Innate";
    case MASTERY_CLASSIFICATION.MASTERY:
      return "Mastery";
    case MASTERY_CLASSIFICATION.PRIMARY:
      return "Primary";
    case MASTERY_CLASSIFICATION.SECONDARY:
      return "Secondary";
  }
};
