import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    likes: 0,
    liked: false,
};

const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        toggleLike: (state) => {
            state.liked = !state.liked;
            state.liked ? state.likes++ : state.likes--;



        },
    },
});

export const { toggleLike } = likeSlice.actions;

export default likeSlice.reducer;