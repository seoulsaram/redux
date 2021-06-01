import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./modules/index";
import { Provider } from "react-redux";
import myLogger from "./middlewares/myLogger";
import logger from "redux-logger";

//스토어에 미들웨어를 적용할 땐 applyMiddleware라는 함수를 사용함
//create store (모든 리듀서가 들어있는 rootReducer를 가지고 있게된다.)
const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
