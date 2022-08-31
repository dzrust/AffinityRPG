import Loader from "@affinity-rpg/components/src/components/loader";
import { FC } from "react";
import { Container } from "react-bootstrap";

const Loading: FC = () => {
  return (
    <Container className="loading__container">
      <Loader />
    </Container>
  );
};

export default Loading;
