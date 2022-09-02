import { FC, Fragment } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { STAGES } from "@affinity-rpg/models";
import { ROUTES } from "@affinity-rpg/models";
import HeroSheet from "../../hero/hero";

const ConfirmationStage: FC = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const backToCharacterSheet = () => {
    navigator(`${ROUTES.HERO}/${id}`);
  };
  return (
    <Fragment>
      <HeroSheet showHeroBuilder={false} />
      <div className="hero-builder__form-buttons-container">
        <Button variant="danger" onClick={() => navigator(`${ROUTES.HERO}/${id}`)}>
          Exit Builder
        </Button>
        <Button variant="secondary" onClick={() => navigator(`${ROUTES.HERO_BUILDER}/${id}/${STAGES.HISTORY}`)}>
          Back
        </Button>
        <Button onClick={backToCharacterSheet}>Finish</Button>
      </div>
    </Fragment>
  );
};

export default ConfirmationStage;
