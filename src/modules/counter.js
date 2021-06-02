import {delay, put, takeEvery, takeLatest} from 'redux-saga/effects';

//액션 타입 (상수로 정해줌)
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const INCREASE_ASYNC = 'INCREASE_ASYNC';
const DECREASE_ASYNC = 'DECREASE_ASYNC';

//액션 생성 함수
//increase 함수를 실행하면 type:INCREASE를 리턴한다.
export const increase = () => ({type: INCREASE});
export const decrease = () => ({type: DECREASE});

//getState를 쓰지 않는다면 굳이 파라미터로 받아올 필요 없음
//dispatch를 받아서, dispatch에 increase액션을 넣고, 1초 뒤에 실행
export const increaseAsync = () => ({type: INCREASE_ASYNC});
export const decreaseAsynce = () => ({type: DECREASE_ASYNC});

function* increaseSaga() {
  yield delay(1000); //1초를 기다림
  yield put(increase()); //put은 특정 액션을 디스패치 해준다.
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

//takeEvery : 특정 액션 타입에 대하여 디스패치되는 모든 액션들을 처리
//takeLatest : 특정 액션 타입에 대하여 디스패치된 가장 마지막 액션만을 처리하는 함수. 예를 들어
// 특정 액션을 처리하고 있는 동안 동일한 타입의 새로운 액션이 디스패치되면 기존에 하던 작업을 무시 처리하고 새로운 작업을 시작한다.
export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga); //모든 INCREASE_ASYNC 액션을 처리
  yield takeLatest(DECREASE_ASYNC, decreaseSaga); //가장 마지막으로 디스패치된 DECREASE_ASYNC액션만을 처리
}

//초기값
const initialState = 0;

//counter함수를 실행하면 state와 action을 받고,
//만약 action.type이 INCREASE라면 state에 1을 더하고 리턴한다.
export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
