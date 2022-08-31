import { faPersonRunning, faDumbbell, faHeart } from "@fortawesome/pro-regular-svg-icons";
import { FC } from "react";
import { AFFINITY } from "@affinity-rpg/models/affinity";
import Emblem from "../emblem";

type Props = {
  type: AFFINITY;
};

const AffinityEmblem: FC<Props> = ({ type }) => {
  return (
    <span className="affinity__emblem">
      <Emblem
        innerIcon={type === AFFINITY.FINESSE ? faPersonRunning : type === AFFINITY.POTENCY ? faDumbbell : faHeart}
      />
    </span>
  );
};

export default AffinityEmblem;
