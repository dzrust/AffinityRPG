import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Hero } from "@affinity-rpg/models/hero";
import { ROUTES } from "@affinity-rpg/models/routes";
import { useGetHeroesQuery } from "@affinity-rpg/data/api/heroes";
import HeroViewer from "@affinity-rpg/components/src/components/hero/hero-viewer";

const AdminHeroes: FC = () => {
  const navigator = useNavigate();
  const { data: heroes } = useGetHeroesQuery();

  const onHeroSelect = (hero: Hero) => {
    navigator(`${ROUTES.HERO}/${hero.id}`, {});
  };
  return (
    <Container>
      <Row>
        <Col>
          <h1>Heroes</h1>
        </Col>
      </Row>

      {(heroes ?? []).map((hero) => (
        <Row className="clickable mt-3" key={hero.id}>
          <HeroViewer onSelectHero={() => onHeroSelect(hero)} hero={hero} />
        </Row>
      ))}
      <div className="m-3" />
    </Container>
  );
};

export default AdminHeroes;
