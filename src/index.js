import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './modules/index';
import {Provider} from 'react-redux';
import myLogger from './middlewares/myLogger';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
//thunk에서 라우터의 history 객체를 사용하려면, BrowserHistory 인스턴스를 직접 만들어서 적용해야 함.

const customHistory = createBrowserHistory();

//스토어에 미들웨어를 적용할 땐 applyMiddleware라는 함수를 사용함
//create store (모든 리듀서가 들어있는 rootReducer를 가지고 있게된다.)
//composeWithDevTools는 redux chrome 익스텐션과 사용할 수 있게 해줌
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk.withExtraArgument({history: customHistory}), logger))
);
//🍅 logger를 사용하는 경우, logger가 가장 마지막에 와야 함
//redux-thunk의 withExtraArgument를 사용하면 thunk함수에서 사전에 정해준 값들을 참조할 수 있다.

//console.log(store.getState());
//스토어의 상태를 확인해봄

ReactDOM.render(
  <Router history={customHistory}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
