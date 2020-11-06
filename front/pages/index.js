import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import HeadComponent from '../components/HeadComponent';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POST_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/types';

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
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    dispatch({
      type: LOAD_POST_REQUEST,
    });
  }, []);

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

export default Home;
