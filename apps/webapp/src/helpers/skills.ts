import { SkillState, SkillStateFormModel, SKILLS } from "../models/skills";
import { STATUS_EFFECT } from "../models/status-effect";

export const getSkillStatesOrDefault = (skills: SkillState[] = []): SkillStateFormModel[] => {
  return SKILLS.map((skill) => {
    const heroSkill = skills.find((_heroSkill) => _heroSkill.skill === skill) as SkillStateFormModel;
    return (
      heroSkill ?? {
        skill: skill,
        modifier: 0,
        rollStatus: STATUS_EFFECT.NONE,
      }
    );
  });
};
