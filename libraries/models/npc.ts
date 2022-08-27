import { AFFINITY } from "./affinity";
import { GENDER } from "./hero";
import { Level } from "./level";
import { DistanceUnit } from "./units";

export enum NPC_STATE {
  HOSTILE = "HOSTILE",
  NEUTRAL = "NEUTRAL",
  FRIENDLY = "FRIENDLY",
}

export enum NPC_TYPE {
  HUMANOID = "HUMANOID",
  CREATURE = "CREATURE",
}

export type NPCTemplate = {
  id: string;
  name: string;
  race: string;
  gender: GENDER;
  affinity: AFFINITY;
  lesserAffinity: AFFINITY;
  baseMovement: DistanceUnit;
  baseHealth: number;
  description: number;
};

export type NPC = {
  state: NPC_STATE;
  type: NPC_TYPE;
  experienceEarned: number;
  level: Level;
  totalHealth: number;
  currentHealth: number;
  potency: number;
  finesse: number;
  vigor: number;
} & NPCTemplate;
