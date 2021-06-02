//액션 타입 (상수로 정해줌)
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

//액션 생성 함수
//increase 함수를 실행하면 type:INCREASE를 리턴한다.
export const increase = () => ({type: INCREASE});
export const decrease = () => ({type: DECREASE});

//getState를 쓰지 않는다면 굳이 파라미터로 받아올 필요 없음
//dispatch를 받아서, dispatch에 increase액션을 넣고, 1초 뒤에 실행
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => dispatch(increase()), 1000);
};

export const decreaseAsynce = () => (dispatch) => {
  setTimeout(() => dispatch(decrease()), 1000);
};

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
