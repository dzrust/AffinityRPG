import { firebaseAuth } from "@affinity-rpg/data";
import { FC } from "react";
import { Button, Container } from "react-bootstrap";

const Settings: FC = () => {
  return (
    <Container>
      <h1>User</h1>
      <Button onClick={() => firebaseAuth.signOut()}>Log Out</Button>
    </Container>
  );
};

export default Settings;
