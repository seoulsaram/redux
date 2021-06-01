import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./modules/index";
import { Provider } from "react-redux";
import myLogger from "./middlewares/myLogger";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

//스토어에 미들웨어를 적용할 땐 applyMiddleware라는 함수를 사용함
//create store (모든 리듀서가 들어있는 rootReducer를 가지고 있게된다.)
//composeWithDevTools는 redux chrome 익스텐션과 사용할 수 있게 해줌
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
