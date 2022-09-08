import { FC } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createHero } from "@affinity-rpg/helpers";
import { Hero, ROUTES } from "@affinity-rpg/models";
import { HeroViewer } from "@affinity-rpg/components";
import { useGetHeroesForUserQuery, useCreateHeroMutation } from "@affinity-rpg/data";
import { useIsLoading, useUserState } from "@affinity-rpg/hooks";

const Heroes: FC = () => {
  const isLoading = useIsLoading();
  const navigator = useNavigate();
  const user = useUserState().user;
  const { data: heroes } = useGetHeroesForUserQuery(user?.uid ?? "");
  const [createHeroAPI] = useCreateHeroMutation();

  const createNewHero = () => {
    if (isLoading || !user) return;
    createHeroAPI({
      ...createHero(),
      userId: user.uid,
    });
  };

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

      <Row className="mt-3">
        <Col>
          <Button onClick={createNewHero} disabled={isLoading}>
            Create New Hero
          </Button>
        </Col>
      </Row>
      <hr />
      {(heroes ?? []).map((hero: Hero) => (
        <Row className="clickable mt-3" key={hero.id}>
          <Col>
            <HeroViewer onSelectHero={() => onHeroSelect(hero)} hero={hero} />
          </Col>
        </Row>
      ))}
      <div className="m-3" />
    </Container>
  );
};

export default Heroes;
