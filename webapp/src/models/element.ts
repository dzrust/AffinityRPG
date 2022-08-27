export enum ELEMENT {
  FIRE = "FIRE",
  ICE = "ICE",
  THUNDER = "THUNDER",
  LIGHT = "LIGHT",
  SHADOW = "SHADOW",
  POISON = "POISON",
  TIME = "TIME",
  PHYSICAL = "PHYSICAL",
}

export const ELEMENTS: ELEMENT[] = Object.keys(ELEMENT).map((key) => (ELEMENT as any)[key]);
