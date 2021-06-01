//root reducer

import { combineReducers } from "redux";
import counter from "./counter";

//counter reducer를 가져옴
const rootReducer = combineReducers({ counter });

export default rootReducer;
