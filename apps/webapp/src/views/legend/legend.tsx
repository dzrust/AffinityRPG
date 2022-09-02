import { DateTime } from "luxon";
import { FC, useContext, useMemo } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { generateInvitation } from "@affinity-rpg/helpers";
import { Hero } from "@affinity-rpg/models";
import { ROUTES } from "@affinity-rpg/models";
import { HeroViewer } from "@affinity-rpg/components";
import { LegendContext } from "@affinity-rpg/components";
import { useUpdateLegendMutation } from "@affinity-rpg/data/src/api/legends";
import { useIsLoading, useUserState } from "@affinity-rpg/hooks";

type Props = {
  showLegendBuilder?: boolean;
};

const LegendSheet: FC<Props> = () => {
  const { legend, heroes } = useContext(LegendContext);
  const isLoading = useIsLoading();
  const user = useUserState().user;
  const navigator = useNavigate();
  const [updateLegend] = useUpdateLegendMutation();
  const onHeroSelect = (hero: Hero) => {
    navigator(`${ROUTES.HERO}/${hero.id}`, {});
  };

  const isGameGuide = useMemo(() => {
    return user?.uid === legend.gameGuideUserId;
  }, [user, legend]);

  const updateInvitationLink = () => {
    if (isLoading) return;
    const { invitationCode, invitationCodeGeneratedDate } = generateInvitation();
    updateLegend({
      ...legend,
      invitationCode,
      invitationCodeGeneratedDate: invitationCodeGeneratedDate.toISO() as any,
    });
  };
  return (
    <div className="hero-sheet__container">
      <Row className="mt-3">
        <Col>
          <h1>
            <label>{legend.name}</label>
          </h1>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          Invitation Link:&nbsp;
          <span className="btn-link">
            https://app.affinity-rpg.com/legend/{legend.id}/join/{legend.invitationCode}
          </span>
        </Col>
        {legend.invitationCodeGeneratedDate.plus({ days: 2 }) < DateTime.now() ? (
          <Col>
            <Button onClick={updateInvitationLink}>Generate new Invitation Link</Button>
          </Col>
        ) : null}
      </Row>
      <Row>
        <Col>
          <i>{legend.tagline}</i>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <p>{legend.description}</p>
        </Col>
      </Row>
      {heroes.map((hero) => (
        <Row className={`mt-3 ${isGameGuide ? "clickable" : ""}`} key={hero.id}>
          <Col>
            <HeroViewer onSelectHero={isGameGuide ? () => onHeroSelect(hero) : undefined} hero={hero} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default LegendSheet;
