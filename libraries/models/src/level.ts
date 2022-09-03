import { Mastery } from "./mastery";
import { HealthRoll, Roll } from "./roll";

export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

export const levelArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export type LevelUp = {
  level: Level;
  completed: boolean;
  masteries: Mastery[];
  vigor: number;
  potency: number;
  finesse: number;
  healthGained: HealthRoll;
  healthModifier: number;
};

export type Levels = {
  1: LevelUp;
  2: LevelUp;
  3: LevelUp;
  4: LevelUp;
  5: LevelUp;
  6: LevelUp;
  7: LevelUp;
  8: LevelUp;
  9: LevelUp;
  10: LevelUp;
  11: LevelUp;
  12: LevelUp;
  13: LevelUp;
  14: LevelUp;
  15: LevelUp;
  16: LevelUp;
  17: LevelUp;
  18: LevelUp;
  19: LevelUp;
  20: LevelUp;
};
