import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import likeReducer from './likeSlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        like: likeReducer,
    },
});

export default store;