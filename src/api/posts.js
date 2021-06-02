import axios from 'axios';

//n 밀리세컨드동안 기다리는 프로미스를 만들어주는 함수
const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

//포스트 목록을 가져오는 비동기 함수
export const getPosts = async () => {
  const response = await axios.get('/posts');
  return response.data;
};

export const getPostById = async (id) => {
  const response = await axios.get(`/posts/${id}`);
  return response.data;
};
