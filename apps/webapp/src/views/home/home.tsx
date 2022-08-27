import { FC } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Emblem from "../../components/emblem";
import { ROUTES } from "../../models/routes";
import { faHelmetBattle } from "@fortawesome/pro-regular-svg-icons";

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
