import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import HeadComponent from '../components/HeadComponent';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POST_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/types';
import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, loadPostLoading, hasMorePosts, retweetError } = useSelector((state) => state.post);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    function onScroll() {
      const { scrollY } = window;
      const { clientHeight, scrollHeight } = document.documentElement;
      if (scrollY + clientHeight > scrollHeight - 300) {
        if (hasMorePosts && !loadPostLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POST_REQUEST,
            lastId,
          });
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostLoading]);

  return (
    <AppLayout>
      <HeadComponent title="메인 | Sns" />
      {me && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;
