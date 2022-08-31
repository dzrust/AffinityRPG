import { FC } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Hero } from "@affinity-rpg/models/hero";
import HeroDescription from "./hero-description";

type Props = {
  hero: Hero;
  onSelectHero?: () => void;
};
const HeroViewer: FC<Props> = ({ hero, onSelectHero }) => {
  return (
    <Card onClick={onSelectHero} className={!!onSelectHero ? "clickable" : ""}>
      <Card.Header>
        <h2>
          <label>{hero.name}</label>
        </h2>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <HeroDescription hero={hero} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default HeroViewer;
