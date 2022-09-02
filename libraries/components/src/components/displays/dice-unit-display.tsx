import { FC } from "react";
import { DiceUnit } from "@affinity-rpg/models";
import { StatDisplay } from "./stat-display";

type Props = {
  diceUnit: DiceUnit;
  label: string;
  variant: string;
  isRollingAllowed?: boolean;
  rollDice?: () => void;
};

export const DiceUnitDisplay: FC<Props> = ({ diceUnit, label, variant, isRollingAllowed = false, rollDice }) => (
  <StatDisplay
    label={`${diceUnit.diceCount > 0 ? diceUnit.diceCount + "D6" : ""}${
      diceUnit.modifier > 0 ? `+ ${diceUnit.modifier}` : ""
    } ${label}`}
    variant={variant}
    display={diceUnit.diceCount + diceUnit.modifier > 0}
    isRollingAllowed={isRollingAllowed}
    rollDice={rollDice}
  />
);
