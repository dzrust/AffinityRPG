import { GoogleAuthProvider } from "firebase/auth";
import { FC, useEffect, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { firebaseAuthUI } from "../../firebase";
import Loading from "../loading/loading";

const Login: FC = () => {
  const [isLoading, setIsLoading] = useState(() => false);
  useEffect(() => {
    firebaseAuthUI.start("#auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          console.log(authResult);
          setIsLoading(false);
          return true;
        },
      },
      signInFlow: "popup",
      signInOptions: [
        {
          provider: GoogleAuthProvider.PROVIDER_ID,
          signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
        },
      ],
    });
  }, []);
  return (
    <Container className="login__container">
      <h1>Login / Signup</h1>
      <div id="auth-container" />
      {firebaseAuthUI.isPendingRedirect() || isLoading ? (
        <Modal fullscreen show animation={false}>
          <Loading />
        </Modal>
      ) : null}
    </Container>
  );
};

export default Login;
