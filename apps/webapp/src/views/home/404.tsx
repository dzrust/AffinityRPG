import { FC, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@affinity-rpg/models/routes";

const BackToHome: FC = () => {
  const navigation = useNavigate();
  useEffect(() => {
    navigation(ROUTES.HOME);
  }, []);
  return (
    <Container>
      <h1>Page Not Found</h1>
      <Link to={ROUTES.HOME}>Back to Home</Link>
    </Container>
  );
};

export default BackToHome;
