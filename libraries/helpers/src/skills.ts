import { SkillState, SkillStateFormModel, SKILLS, STATUS_EFFECT } from "@affinity-rpg/models";

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
