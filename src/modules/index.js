//root reducer

import {all} from '@redux-saga/core/effects';
import {combineReducers} from 'redux';
import counter, {counterSaga} from './counter';
import posts, {postsSaga} from './posts';

//counter reducer를 가져옴
const rootReducer = combineReducers({counter, posts});
export function* rootSaga() {
  yield all([counterSaga(), postsSaga()]); //all은 배열 안의 여러 사가를 동시에 실행시켜줌.
}
export default rootReducer;
