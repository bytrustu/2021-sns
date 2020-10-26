import {ADD_POST} from "./types";

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
    postAdded: false,
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
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,
            };
        default:
            return state;
    }
}

export default reducer;