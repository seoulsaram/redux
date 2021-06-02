import React from 'react';
import Counter from '../components/Counter';
import {useDispatch, useSelector} from 'react-redux';
import {decrease, decreaseAsynce, increase, increaseAsync} from '../modules/counter';

function CounterContainer(props) {
  //useSelector는 리덕스 스토어의 상태를 조회하는 hook.
  const number = useSelector((state) => state.counter);

  //useDispatch는 리덕스 스토어의 dispatch를 함수에서 사용할 수 있게 해주는 hook.
  const dispatch = useDispatch();

  //dispatch를 통해 스토어의 함수를 사용함
  const onIncrease = () => {
    dispatch(increaseAsync());
  };
  const onDecrease = () => {
    dispatch(decreaseAsynce());
  };

  return <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />;
}

export default CounterContainer;
