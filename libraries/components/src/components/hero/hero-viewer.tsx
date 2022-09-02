import { FC } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Hero } from "@affinity-rpg/models";
import { HeroDescription } from "./hero-description";

type Props = {
  hero: Hero;
  onSelectHero?: () => void;
};

export const HeroViewer: FC<Props> = ({ hero, onSelectHero }) => {
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
