import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Post from '../components/Post';
import {clearPost, getPost, goToHome} from '../modules/posts';

function PostContainer({postId}) {
  const {data, loading, error} = useSelector(
    (state) => state.posts.post[postId] || {loading: false, data: null, error: null}
  ); //아예 데이터가 존재하지 않을 때가 있으므로, 비구조화 할당 오류가 나지 않도록.
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId]);

  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <>
      <button onClick={() => dispatch(goToHome())}>홈으로 고고씽</button>
      <Post post={data} />
    </>
  );
}

export default PostContainer;
