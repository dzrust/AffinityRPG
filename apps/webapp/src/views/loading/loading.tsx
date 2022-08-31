import { FC } from "react";
import { Container } from "react-bootstrap";
import Loader from "../../components/loader";

const Loading: FC = () => {
  return (
    <Container className="loading__container">
      <Loader />
    </Container>
  );
};

export default Loading;
