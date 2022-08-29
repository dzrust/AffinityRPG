import { faFistRaised } from "@fortawesome/pro-regular-svg-icons";
import { FC, Fragment } from "react";
import Emblem from "../emblem";

type Props = {
  weaponSlots: 0 | 1 | 2;
};

const WeaponSlots: FC<Props> = ({ weaponSlots }) => {
  if (weaponSlots === 0) return null;
  return (
    <Fragment>
      <Emblem innerIcon={faFistRaised} />
      {weaponSlots === 2 ? <Emblem innerIcon={faFistRaised} /> : null}
    </Fragment>
  );
};

export default WeaponSlots;
