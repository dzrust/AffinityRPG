import { AFFINITY } from "@affinity-rpg/models/affinity";
import { Hero } from "@affinity-rpg/models/hero";

export const getBaseAffinityStatScore = (hero: Partial<Hero>) => {
  const newHero = { ...hero };
  newHero.potency = (newHero.potency ?? 0) > 0 ? newHero.potency : 1;
  newHero.finesse = (newHero.finesse ?? 0) > 0 ? newHero.finesse : 1;
  newHero.vigor = (newHero.vigor ?? 0) > 0 ? newHero.vigor : 1;
  if (newHero.affinity === AFFINITY.POTENCY && (newHero.potency ?? 0) < 3) {
    newHero.potency = 3;
  }
  if (newHero.affinity === AFFINITY.FINESSE && (newHero.finesse ?? 0) < 3) {
    newHero.finesse = 3;
  }
  if (newHero.affinity === AFFINITY.VIGOR && (newHero.vigor ?? 0) < 3) {
    newHero.vigor = 3;
  }
  return newHero;
};
