import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
    ADD_POST,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    LOG_IN_REQUEST
} from "./types";

export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'bytrustu'
        },
        content: '첫 번째 게시글 #해시태그 #익스프레스',
        Images: [
            {src: 'https://source.unsplash.com/random/301x201'},
            {src: 'https://source.unsplash.com/random/301x201'},
            {src: 'https://source.unsplash.com/random/301x201'},
        ],
        Comments: [
            {User: {nickname: 'joon1'}, content: '안녕하세요1',},
            {User: {nickname: 'joon2'}, content: '안녕하세요2',},
            {User: {nickname: 'joon3'}, content: '안녕하세요3',},
        ],
    }],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
}

export const addPost = (data) => {
    return {
        type: ADD_POST_REQUEST,
        data,
    }
}

export const addComment = (data) => {
    return {
        type: ADD_COMMENT_REQUEST,
        data,
    }
}


const dummyPost = {
    id: 2,
    User: {
        id: 'bytrustu',
        nickname: 'bytrustu'
    },
    content: ' 번째 게시글 #해시태그 #익스프레스',
    Images: [
        {src: 'https://source.unsplash.com/random/301x201'},
        {src: 'https://source.unsplash.com/random/301x201'},
        {src: 'https://source.unsplash.com/random/301x201'},
    ],
    Comments: [
        {User: {nickname: 'joon1'}, content: '안녕하세요1',},
        {User: {nickname: 'joon2'}, content: '안녕하세요2',},
        {User: {nickname: 'joon3'}, content: '안녕하세요3',},
    ],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            }
        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                addPostLoading: true,
                addPostDone: true,
            }
        case ADD_POST_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            }
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,
            }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: true,
            }
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.error,
            }

        default:
            return state;
    }
}

export default reducer;