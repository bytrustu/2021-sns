import shortId from 'shortid';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS, ADD_POST_TO_ME, REMOVE_POST_FAILURE, REMOVE_POST_OF_ME, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS,
} from './types';

export const initialState = {
  mainPosts: [{
    id: shortId.generate(),
    User: {
      id: 1,
      nickname: 'bytrustu',
    },
    content: '첫 번째 게시글 #해시태그 #익스프레스',
    Images: [
      { id: shortId.generate(), src: 'https://source.unsplash.com/random/301x201' },
      { id: shortId.generate(), src: 'https://source.unsplash.com/random/301x201' },
      { id: shortId.generate(), src: 'https://source.unsplash.com/random/301x201' },
    ],
    Comments: [
      { id: shortId.generate(), User: { id: shortId.generate(), nickname: 'joon1' }, content: '안녕하세요1' },
      { id: shortId.generate(), User: { id: shortId.generate(), nickname: 'joon2' }, content: '안녕하세요2' },
      { id: shortId.generate(), User: { id: shortId.generate(), nickname: 'joon3' }, content: '안녕하세요3' },
    ],
  }],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 'bytrustu',
    nickname: 'bytrustu',
  },
  Images: [],
  Comments: [
    { User: { nickname: 'joon1' }, content: '안녕하세요1' },
    { User: { nickname: 'joon2' }, content: '안녕하세요2' },
    { User: { nickname: 'joon3' }, content: '안녕하세요3' },
  ],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: 'joon',
  },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
        removePostLoading: false,
        removePostDone: true,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };


    default:
      return state;
  }
};

export default reducer;
