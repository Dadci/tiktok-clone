import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        user:
        {
            username: 'admin123',
            password: 'admin123',
        }
        ,


    },
    reducers: {

        login: (state, action) => {
            const { username, password } = action.payload;
            if (username === state.user.username && password === state.user.password) {
                state.loggedInUser = state.user;
            } else {
                state.loggedInUser = null;
            }
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;