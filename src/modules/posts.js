import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
import {
  createPromiseThunk,
  reducerUtils,
  handleAsyncActions,
  createPromiseThunkById,
  handleAsyncActionsById,
} from '../lib/asyncUtils';

/* 프로미스를 다루는 리덕스 모듈을 다룰 땐 다음과 같은 사항을 고려해야 함
1. 프로미스가 시작, 성공, 실패했을 때 다른 액션을 디스패치 해야 함
2. 각 프로미스마다 thunk 함수를 만들어주어야 함.
3. 리듀서에서 액션에 따라 로딩중, 결과, 에러 상태를 반영해주어야 함.
*/

/* 액션 타입 */

//포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

//포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

//포스트 비우기
const CLEAR_POST = 'CLEAR_POST';

// thunk를 사용할 때, 꼭 모든 액션들에 대해서 액션 생성함수를 만들 필요는 없음
// 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮음.

//리팩토링 전
// export const getPosts = () => async (dispatch) => {
//   dispatch({type: GET_POSTS}); //요청 시작됨
//   try {
//     const posts = await postsAPI.getPosts(); //API 호출
//     dispatch({type: GET_POSTS_SUCCESS, posts}); //성공
//   } catch (e) {
//     dispatch({type: GET_POST_ERROR, error: e}); //실패
//   }
// };

// export const getPost = (id) => async (dispatch) => {
//     dispatch({type: GET_POST}); //요청 시작
//     try {
//       const post = await postsAPI.getPostById(id);
//       dispatch({type: GET_POST_SUCCESS, post}); //성공
//     } catch (e) {
//       dispatch({type: GET_POST_ERROR, error: e}); //실패
//     }
//   };

//리팩토링 후
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

// export const clearPost = () => ({type: CLEAR_POST});

//전
// const initialState = {
//   posts: {
//     loading: false,
//     data: null,
//     error: null,
//   },
//   post: {
//     loading: false,
//     data: null,
//     error: null,
//   },
// };

//후
const initialState = {
  posts: reducerUtils.initial(),
  // post: reducerUtils.initial(),
  post: {},
};

//전
// export default function posts(state = initialState, action) {
//   switch (action.type) {
//     case GET_POSTS:
//       return {
//         ...state,
//         posts: reducerUtils.loading(),
//       };
//     case GET_POSTS_SUCCESS:
//       return {
//         ...state,
//         posts: reducerUtils.success(action.payload),
//       };
//     case GET_POSTS_ERROR:
//       return {
//         ...state,
//         posts: reducerUtils.error(action.error),
//       };
//     case GET_POST:
//       return {
//         ...state,
//         post: reducerUtils.loading(),
//       };
//     case GET_POST_SUCCESS:
//       return {
//         ...state,
//         post: reducerUtils.success(action.payload),
//       };
//     case GET_POST_ERROR:
//       return {
//         ...state,
//         post: reducerUtils.error(action.error),
//       };
//     default:
//       return state;
//   }
// }

//후
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      //const postsReducer = handleAsyncActions(GET_POSTS, 'posts');
      //return postsReducer(state, action);
      return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActionsById(GET_POST, 'post')(state, action);
    // case CLEAR_POST:
    //   return {
    //     ...state,
    //     post: reducerUtils.initial(),
    //   };
    default:
      return state;
  }
}

//3번째 인자를 사용하면 withExtraArgument에서 넣어준 값들을 사용할 수 있음.
export const goToHome =
  () =>
  (dispatch, getState, {history}) => {
    history.push('/');
  };
