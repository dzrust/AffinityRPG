import { FC } from "react";
import { useDispatch } from "react-redux";
import { ROLL_TYPES } from "../../models/roll";
import { DIFFICULTY } from "../../models/skills";
import { addRollNotification } from "../../slices/appSlice";
import { v4 } from "uuid";
import { rollRating, rollD6, resistanceRoll, rollStatusEffect, rollSkillSeries } from "../../helpers/roll";

type Props = {
  render: (rollDice: () => void) => JSX.Element;
  numberOfDice: number;
  modifier?: number;
  message: string;
  rollType: ROLL_TYPES;
  difficulty?: DIFFICULTY;
};

const RollButton: FC<Props> = ({ numberOfDice, modifier = 0, message, rollType, difficulty, render }) => {
  const dispatch = useDispatch();
  const rollDice = () => {
    if (rollType === ROLL_TYPES.RATING_ROLL) {
      const ratingRollResult = rollRating(numberOfDice);
      dispatch(
        addRollNotification({
          id: v4(),
          message,
          type: rollType,
          criticalRolls: ratingRollResult.rolls[0].criticalRolls,
          diceLost: ratingRollResult.rolls[0].diceLost,
          result: ratingRollResult.result,
        }),
      );
    }
    if (rollType === ROLL_TYPES.ROLL) {
      const rollResult = rollD6(numberOfDice);
      dispatch(
        addRollNotification({
          id: v4(),
          message,
          type: rollType,
          criticalRolls: 0,
          diceLost: 0,
          result: rollResult.total + modifier,
        }),
      );
    }
    if (rollType === ROLL_TYPES.RESISTANCE_ROLL) {
      const resistanceRollResult = resistanceRoll(numberOfDice);
      dispatch(
        addRollNotification({
          id: v4(),
          message,
          type: rollType,
          criticalRolls: 0,
          diceLost: 0,
          result: resistanceRollResult.resistanceTotal + modifier,
        }),
      );
    }
    if (rollType === ROLL_TYPES.STATUS_EFFECT) {
      const statusEffectRoll = rollStatusEffect(numberOfDice);
      dispatch(
        addRollNotification({
          id: v4(),
          message,
          type: rollType,
          criticalRolls: statusEffectRoll.rolls[0].criticalRolls,
          diceLost: statusEffectRoll.rolls[0].diceLost,
          result: statusEffectRoll.result,
        }),
      );
    }
    if (rollType === ROLL_TYPES.SKILL_ROLL && difficulty) {
      const skillRoll = rollSkillSeries(difficulty)(numberOfDice);
      dispatch(
        addRollNotification({
          id: v4(),
          message,
          type: rollType,
          criticalRolls: skillRoll.rolls[skillRoll.rolls.length - 1].criticalRolls,
          diceLost: skillRoll.rolls[skillRoll.rolls.length - 1].diceLost,
          result: skillRoll.result,
        }),
      );
    }
    if (rollType === ROLL_TYPES.HIT_ROLL) {
      const hitRoll = rollSkillSeries(DIFFICULTY.EASY)(numberOfDice);
      dispatch(
        addRollNotification({
          id: v4(),
          message,
          type: rollType,
          criticalRolls: hitRoll.rolls[0].criticalRolls,
          diceLost: hitRoll.rolls[0].diceLost,
          result: hitRoll.result,
        }),
      );
    }
  };
  return render(rollDice);
};

export default RollButton;
