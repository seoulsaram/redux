import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import rootReducer from "./modules/index";
import { Provider } from "react-redux";

//create store (모든 리듀서가 들어있는 rootReducer를 가지고 있게된다.)
const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
