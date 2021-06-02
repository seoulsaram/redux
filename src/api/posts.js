//n 밀리세컨드동안 기다리는 프로미스를 만들어주는 함수
const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

//가짜 포스트 목록 데이터
const posts = [
  {id: 1, title: '리덕스 미들웨어를 배워보자', body: '리덕스 미들웨어를 직접 만들어보면 이해하기 쉽죠.'},
  {id: 2, title: 'redux-thunk 사용해보자', body: '아 하기싫어!'},
  {id: 3, title: 'redux-saga도 사용해보자', body: '아~재밌따'},
];

//포스트 목록을 가져오는 비동기 함수
export const getPosts = async () => {
  await sleep(500);
  return posts;
};

export const getPostById = async (id) => {
  await sleep(500);
  return posts.find((post) => post.id === id); //id로 찾아서 반환
};
