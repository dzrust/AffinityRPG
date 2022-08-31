import Loader from "@affinity-rpg/components/src/components/loader";
import { useAppState } from "@affinity-rpg/hooks/src/hooks";
import { FC, Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./navigation";

const App: FC = () => {
  const { loadingCount } = useAppState();
  return (
    <Fragment>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
      {loadingCount > 0 ? <Loader /> : null}
    </Fragment>
  );
};

export default App;
