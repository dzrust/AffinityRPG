import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD6 } from "@fortawesome/pro-duotone-svg-icons";
import { FC, useMemo } from "react";
import { AFFINITY } from "@affinity-rpg/models/affinity";
import { ROLL_TYPES } from "@affinity-rpg/models/roll";
import { Button } from "react-bootstrap";
import AffinityEmblem from "@affinity-rpg/components/src/components/affinity/affinity-emblem";
import RollButton from "@affinity-rpg/components/src/components/roll/roll-button";

type Props = {
  affinityText: string;
  affinity: number;
  type: AFFINITY;
  isRollsAllowed?: boolean;
};

const AffinityScore: FC<Props> = ({ affinity, affinityText, type, isRollsAllowed = false }) => {
  const affinityArray = useMemo(() => {
    const affinityArray: number[] = [];
    for (let i = 0; i < affinity; i++) {
      affinityArray.push(i);
    }
    return affinityArray;
  }, [affinity]);
  return (
    <div className="affinity__level">
      <AffinityEmblem type={type} />
      {isRollsAllowed ? (
        <span className="affinity__emblem">
          <RollButton
            message={`Rolling ${affinityText}`}
            numberOfDice={affinity}
            rollType={ROLL_TYPES.ROLL}
            render={(rollDice) => (
              <Button variant="link" className="affinity__level--label clickable" onClick={rollDice}>
                {affinityText}
              </Button>
            )}
          />
        </span>
      ) : (
        <h4 className="affinity__level--label">{affinityText}</h4>
      )}

      {affinityArray.map((value) => (
        <FontAwesomeIcon
          key={`${affinityText}-value-${value}`}
          icon={faDiceD6}
          className="affinity__level--dice text-primary"
        />
      ))}
    </div>
  );
};

export default AffinityScore;
