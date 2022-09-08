import { AFFINITY } from "./affinity";
import { GENDER } from "./hero";
import { Level, Levels } from "./level";
import { RATING } from "./rating";
import { SkillState } from "./skills";
import { DistanceUnit } from "./units";

export const BASE_NPC_HEALTH_MODIFIER = 10;

export enum NPC_STATE {
  HOSTILE = "HOSTILE",
  NEUTRAL = "NEUTRAL",
  FRIENDLY = "FRIENDLY",
}

export type NPCTemplate = {
  id: string;
  name: string;
  race: string;
  gender: GENDER;
  affinity: AFFINITY;
  baseMovement: DistanceUnit;
  baseHealth: number;
  description: string;
  rating: RATING;
};

export type NPC = {
  state: NPC_STATE;
  experienceEarned: number;
  level: Level;
  totalHealth: number;
  currentHealth: number;
  potency: number;
  finesse: number;
  vigor: number;
  levels: Levels;
  skills: SkillState[];
} & NPCTemplate;
