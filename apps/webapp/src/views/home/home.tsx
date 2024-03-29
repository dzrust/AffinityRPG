import { FC } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROUTES } from "@affinity-rpg/models";
import { faHelmetBattle } from "@fortawesome/pro-regular-svg-icons";
import { Emblem } from "@affinity-rpg/components";

const Home: FC = () => {
  return (
    <Container>
      <h1 className="page-title">
        <Emblem innerIcon={faHelmetBattle} /> Affinity RPG
      </h1>
      <Link to={ROUTES.DICE_ROLLER}>Roll Dice!</Link>
    </Container>
  );
};

export default Home;
