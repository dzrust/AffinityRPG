import { DateTime } from "luxon";
import { FC, useMemo } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createLegend } from "@affinity-rpg/helpers";
import { Legend, ROUTES } from "@affinity-rpg/models";
import { useGetGGLegendsQuery, useGetLegendsQuery, useCreateLegendMutation } from "@affinity-rpg/data";
import { LegendViewer } from "@affinity-rpg/components";
import { useIsLoading, useUserState } from "../../hooks";

const Legends: FC = () => {
  const isLoading = useIsLoading();
  const user = useUserState().user;
  const navigator = useNavigate();
  const { data: ggLegends } = useGetGGLegendsQuery(user?.uid ?? "");
  const { data: legendsData } = useGetLegendsQuery(user?.uid ?? "");
  const [createLegendAPI] = useCreateLegendMutation();
  const legends = useMemo(() => {
    return [...(ggLegends ?? []), ...(legendsData ?? [])].map((legend) => ({
      ...legend,
      invitationCodeGeneratedDate: DateTime.fromISO(legend.invitationCodeGeneratedDate as any),
    }));
  }, [ggLegends, legendsData]);
  const createNewLegend = () => {
    if (isLoading || !user) return;
    createLegendAPI({
      ...createLegend(),
      invitationCodeGeneratedDate: DateTime.now().toISO() as any,
      gameGuideUserId: user.uid,
    });
  };
  const onLegendSelect = (legend: Legend) => {
    navigator(`${ROUTES.LEGENDS}/${legend.id}`, {});
  };
  return (
    <Container>
      <Row>
        <Col>
          <h1>Legends</h1>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Button onClick={createNewLegend} disabled={isLoading}>
            Create New Legend
          </Button>
        </Col>
      </Row>
      <hr />
      {legends.map((legend) => (
        <Row className="clickable mt-3" key={legend.id}>
          <LegendViewer legend={legend} onSelectLegend={() => onLegendSelect(legend)} user={user} />
        </Row>
      ))}
      <div className="m-3" />
    </Container>
  );
};

export default Legends;
