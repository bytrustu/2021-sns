import produce from 'immer';
import {
  ADD_POST_TO_ME,
  CHANGE_NICKNAME_FAILURE,
  CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST, LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS, REMOVE_POST_OF_ME, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS,
} from './types';

export const initialState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: false,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: false,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: false,
  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: false,
  me: null,
  signUpData: {},
  loginData: {},
};

const dummyUser = (data) => ({
  ...data,
  nickname: 'bytrustu',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ nickname: 'joon1' }, { nickname: 'joon2' }, { nickname: 'joon3' }, { nickname: 'joon4' }],
  Followers: [{ nickname: 'joon1' }, { nickname: 'joon2' }, { nickname: 'joon3' }, { nickname: 'joon4' }],
});

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInError = null;
      draft.loginDone = false;
      break;
    case LOG_IN_SUCCESS:
      draft.logInLoading = false;
      draft.loginDone = true;
      draft.me = dummyUser(action.data);
      break;
    case LOG_IN_FAILURE:
      draft.logInLoading = false;
      draft.logInError = action.error;
      break;
    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutDone = false;
      draft.logOutError = null;
      break;
    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false;
      draft.logOutDone = true;
      draft.me = null;
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false;
      draft.logOutError = action.error;
      break;
    case SIGN_UP_REQUEST:
      draft.signUpLoading = true;
      draft.signUpDone = false;
      draft.signUpError = null;
      break;
    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false;
      draft.signUpDone = true;
      break;
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false;
      draft.signUpError = action.error;
      break;
    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameLoading = true;
      draft.changeNicknameDone = false;
      draft.changeNicknameError = null;
      break;
    case CHANGE_NICKNAME_SUCCESS:
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = true;
      break;
    case CHANGE_NICKNAME_FAILURE:
      draft.changeNicknameLoading = false;
      draft.changeNicknameError = action.error;
      break;
    case ADD_POST_TO_ME:
      draft.me.Posts.unshift({ id: action.data });
      break;
    case REMOVE_POST_OF_ME:
      draft.me.Posts.filter((v) => v.id !== action.data);
      break;
    default:
      break;
  }
});

export default reducer;
