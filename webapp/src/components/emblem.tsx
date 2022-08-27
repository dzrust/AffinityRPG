import { faHexagon as faHexagonSolid } from "@fortawesome/pro-solid-svg-icons";
import { faHexagon } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
  innerIcon?: IconProp;
  primaryColor?: string;
  seconadryColor?: string;
  onClick?: Function;
};

const Emblem: FC<Props> = ({ innerIcon, primaryColor = "#a60000", seconadryColor = "#ecad17", onClick }) => {
  return (
    <span
      className={`fa-layers fa-fw fa-lg ${onClick ? "clickable" : ""}`}
      onClick={onClick ? () => onClick() : undefined}
    >
      <FontAwesomeIcon icon={faHexagonSolid} color={primaryColor} />
      <FontAwesomeIcon icon={faHexagon} color={seconadryColor} transform="shrink-3" />
      {innerIcon ? <FontAwesomeIcon icon={innerIcon} inverse transform={{ size: 6 }} fixedWidth /> : null}
    </span>
  );
};

export default Emblem;
