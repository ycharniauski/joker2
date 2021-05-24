import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import { store } from "store/store";
import App from "components/App";
import { createDataProvider } from "providers/dataProvider/createDataProvider";
import injector from "utils/injector";

import "./assets/base.scss";

injector.registerDataProvider(createDataProvider({ responseDelay: 200 }));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
