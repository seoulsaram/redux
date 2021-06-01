//액션 타입 (상수로 정해줌)
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

//액션 생성 함수
//increase 함수를 실행하면 type:INCREASE를 리턴한다.
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

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
