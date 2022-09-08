import { faUser, faUserPilotTie } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Legend } from "@affinity-rpg/models";

type Props = {
  legend: Legend;
  user: any | null;
  onSelectLegend?: () => void;
};

export const LegendViewer: FC<Props> = ({ legend, user, onSelectLegend }) => {
  return (
    <Card onClick={onSelectLegend} className={!!onSelectLegend ? "clickable" : ""}>
      <Card.Body>
        <Row>
          <Col sm={1}>
            <FontAwesomeIcon
              icon={legend.gameGuideUserId === user?.uid ? faUserPilotTie : faUser}
              size="2x"
              fixedWidth
            />
          </Col>
          <Col sm={10}>
            <Row>
              <Col>
                <h4>{legend.name}</h4>
              </Col>
            </Row>
            <Row>
              <Col>{legend.tagline}</Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
