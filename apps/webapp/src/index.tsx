import "@affinity-rpg/data";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { Provider } from "react-redux";
import { store } from "./store";

import "firebaseui/dist/firebaseui.css";
import "./styles/styles.scss";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);
