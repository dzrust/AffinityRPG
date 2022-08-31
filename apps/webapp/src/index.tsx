import "@affinity-rpg/data/firebase";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { Provider } from "react-redux";
import { store } from "@affinity-rpg/data/store";

import "firebaseui/dist/firebaseui.css";
import "./styles/styles.scss";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
