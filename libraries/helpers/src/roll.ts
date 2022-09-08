import {
  RATING,
  Roll,
  DiceFaceType,
  SkillRoll,
  rollLookup,
  RollSeries,
  ResistanceRoll,
  resistanceRollLookup,
  damageRollLookup,
  DIFFICULTY,
  STATUS_RATING,
  DamageRoll,
  HealthRoll,
} from "@affinity-rpg/models";

export const getNumberOfSuccessForStatusRating = (numberOfSuccesses: number) => {
  if (numberOfSuccesses === 2) {
    return STATUS_RATING.UNCOMMON;
  }
  if (numberOfSuccesses === 4) {
    return STATUS_RATING.RARE;
  }
  if (numberOfSuccesses === 5) {
    return STATUS_RATING.LEGENDARY;
  }

  return STATUS_RATING.COMMON;
};

export const getNumberOfSuccessForDifficulty = (difficulty: DIFFICULTY) => {
  switch (difficulty) {
    case DIFFICULTY.EVERY_DAY_TASK:
      return 0;
    case DIFFICULTY.EASY:
      return 1;
    case DIFFICULTY.MEDIUM:
      return 2;
    case DIFFICULTY.HARD:
      return 4;
    case DIFFICULTY.VERY_HARD:
      return 6;
    case DIFFICULTY.LEGENDARY:
      return 8;
  }
};

export const getNumberOfSuccessForRating = (numberOfSuccesses: number) => {
  if (numberOfSuccesses === 1) {
    return RATING.COMMON;
  }
  if (numberOfSuccesses === 2) {
    return RATING.UNCOMMON;
  }
  if (numberOfSuccesses === 4) {
    return RATING.RARE;
  }
  if (numberOfSuccesses === 5) {
    return RATING.LEGENDARY;
  }

  return RATING.FAILURE;
};

export const rollD6 = (numberOfDiceToRoll: number): Roll => {
  const results: DiceFaceType[] = [];
  let total = 0;
  for (let i = 0; i < numberOfDiceToRoll; i++) {
    const roll = Math.trunc(Math.random() * 6) + 1;
    total += roll;
    results.push(roll as DiceFaceType);
  }

  return {
    total,
    results,
  };
};

export const skillRoll = (numberOfDiceToRoll: number): SkillRoll => {
  const results = rollD6(numberOfDiceToRoll);
  let skillTotal = 0;
  let diceLost = 0;
  let criticalRolls = 0;
  for (let i = 0, { length } = results.results; i < length; i++) {
    skillTotal += rollLookup[results.results[i]];
    diceLost += results.results[i] < 3 ? 1 : 0;
    criticalRolls += results.results[i] === 6 ? 1 : 0;
  }
  return {
    skillTotal,
    success: skillTotal > 0,
    diceLost,
    criticalRolls,
    results: results.results,
    total: results.total,
  };
};

export const rollSeries =
  <T>(
    isDone: (numberOfSuccesses: number) => boolean,
    getResult: (rolls: SkillRoll[], numberOfSuccesses: number) => RollSeries<T>,
  ) =>
  (numberOfDiceToRoll: number): RollSeries<T> => {
    const rolls: SkillRoll[] = [];
    let currentNumberOfDiceToRoll = numberOfDiceToRoll;
    let numberOfSuccesses = 0;

    do {
      const rollResult = skillRoll(numberOfDiceToRoll);
      rolls.push(rollResult);
      if (rollResult.success) {
        numberOfSuccesses++;
      }
      currentNumberOfDiceToRoll = currentNumberOfDiceToRoll - rollResult.diceLost;
    } while (currentNumberOfDiceToRoll > 0 && !isDone(numberOfSuccesses));
    return getResult(rolls, numberOfSuccesses);
  };

export const rollRating = rollSeries<RATING>(
  (numberOfSuccesses: number) =>
    [RATING.FAILURE, RATING.LEGENDARY].includes(getNumberOfSuccessForRating(numberOfSuccesses)),
  (rolls: SkillRoll[], numberOfSuccesses: number) => ({
    rolls,
    result: getNumberOfSuccessForRating(numberOfSuccesses),
  }),
);

export const rollStatusEffect = rollSeries<STATUS_RATING>(
  (numberOfSuccesses: number) =>
    [STATUS_RATING.LEGENDARY].includes(getNumberOfSuccessForStatusRating(numberOfSuccesses)),
  (rolls: SkillRoll[], numberOfSuccesses: number) => ({
    rolls,
    result: getNumberOfSuccessForStatusRating(numberOfSuccesses),
  }),
);

export const rollSkillSeries = (difficulty: DIFFICULTY) =>
  rollSeries<boolean>(
    (numberOfSuccesses: number) => getNumberOfSuccessForDifficulty(difficulty) === numberOfSuccesses,
    (rolls: SkillRoll[], numberOfSuccesses: number) => ({
      rolls,
      result: getNumberOfSuccessForDifficulty(difficulty) === numberOfSuccesses,
    }),
  );

export const resistanceRoll = (numberOfDiceToRoll: number): ResistanceRoll => {
  const results = rollD6(numberOfDiceToRoll);
  let resistanceTotal = 0;
  for (let i = 0, { length } = results.results; i < length; i++) {
    resistanceTotal += resistanceRollLookup[results.results[i]];
  }
  return {
    resistanceTotal: resistanceTotal,
    results: results.results,
    total: results.total,
  };
};

export const rollDamage = (numberOfDiceToRoll: number): DamageRoll => {
  const results = rollD6(numberOfDiceToRoll);
  let damageTotal = 0;
  for (let i = 0, { length } = results.results; i < length; i++) {
    damageTotal += damageRollLookup[results.results[i]];
  }
  return {
    damageTotal: damageTotal,
    results: results.results,
    total: results.total,
  };
};

export const rollHealth = (numberOfDiceToRoll: number): HealthRoll => {
  const results = rollD6(numberOfDiceToRoll);
  return {
    healthTotal: results.total,
    results: results.results,
    total: results.total,
  };
};
