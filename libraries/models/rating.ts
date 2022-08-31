export enum RATING {
  FAILURE = "FAILURE",
  COMMON = "COMMON",
  UNCOMMON = "UNCOMMON",
  RARE = "RARE",
  LEGENDARY = "LEGENDARY",
}

export const RATINGS: RATING[] = Object.keys(RATING).map((skillKey) => (RATING as any)[skillKey]);
