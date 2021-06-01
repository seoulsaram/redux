import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import { decrease, increase } from "../modules/counter";

function CounterContainer(props) {
  //useSelector는 리덕스 스토어의 상태를 조회하는 hook.
  console.log(useSelector());
  const number = useSelector((state) => state.counter);

  //useDispatch는 리덕스 스토어의 dispatch를 함수에서 사용할 수 있게 해주는 hook.
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increase());
  };
  const onDecrease = () => {
    dispatch(decrease());
  };

  return <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />;
}

export default CounterContainer;
