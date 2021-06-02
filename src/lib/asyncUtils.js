import {call, put} from 'redux-saga/effects';

//프로미스를 기다렸다가 결과를 디스패치하는 사가
export const createPromiseSaga = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    try {
      // 재사용성을 위하여 promiseCreator 의 파라미터엔 action.payload 값을 넣도록 설정합니다.
      const payload = yield call(promiseCreator, action.payload);
      yield put({type: SUCCESS, payload});
    } catch (e) {
      yield put({type: ERROR, error: true, payload: e});
    }
  };
};

//특정 id의 데이터를 조회하는 용도로 사용하는 사가
//API를 호출할 때 파라미터는 action.payload를 넣고,
// id값을 action.meta로 설정한다.
export const createPromiseSagaById = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    const id = action.meta;
    try {
      const payload = yield call(promiseCreator, action.payload);
      yield put({type: SUCCESS, payload, meta: id});
    } catch (e) {
      yield put({type: ERROR, error: e, meta: id});
    }
  };
};

// 리듀서에서 사용할 수 있는 여러 유틸 함수들
export const reducerUtils = {
  //초기 상태. 초기 data값은 기본적으로 null이지만 바꿀 수도 있음
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),
  // 로딩중 상태. prevState의 경우엔 기본값은 null이지만 따로 값을 지정하면 null로 바꾸지 않고 다른 값을 유지시킬 수 있음
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
  }),
  //성공 상태
  success: (payload) => ({
    loading: false,
    data: payload,
    error: null,
  }),
  //실패 상태
  error: (error) => ({
    loading: false,
    data: null,
    error: error,
  }),
};

export const handleAsyncActions = (type, key, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          //keepData가 true면 로딩을 할 때에도 데이터를 유지하도록 한 것.
          [key]: reducerUtils.loading(keepData ? state[key].data : null),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.error),
        };
      default:
        return state;
    }
  };
};

const defaultIdSelector = (param) => param;
export const createPromiseThunkById = (
  type,
  promiseCreator,
  //파라미터에서 id를 어떻게 선택할 지 정의하는 함수
  //기본 값으로는 파라미터를 그대로 id로 사용
  //하지만 만약 파라미터가 {id:1, details:true}이런 형태라면
  //idSelector를 parma => param.id 이런식으로 설정할 수 있음.
  idSelector = defaultIdSelector
) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (param) => async (dispatch) => {
    const id = idSelector(param);
    dispatch({type, meta: id});
    try {
      const payload = await promiseCreator(param);
      dispatch({type: SUCCESS, payload, meta: id});
    } catch (e) {
      dispatch({type: ERROR, error: true, payload: e, meta: id});
    }
  };
};

//id별로 처리하는 유틸함수
export const handleAsyncActionsById = (type, key, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    const id = action.meta;
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(keepData ? state[key][id] && state[key][id].data : null),
          },
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.success(action.payload),
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.error(action.payload),
          },
        };
      default:
        return state;
    }
  };
};
