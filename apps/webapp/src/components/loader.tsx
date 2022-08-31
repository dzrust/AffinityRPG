import { faDiceD6 } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const Loader: FC = () => {
  return (
    <div className="loader">
      <FontAwesomeIcon icon={faDiceD6} beatFade />
    </div>
  );
};

export default Loader;
