//root reducer

import {combineReducers} from 'redux';
import counter from './counter';
import posts from './posts';

//counter reducer를 가져옴
const rootReducer = combineReducers({counter, posts});

export default rootReducer;
