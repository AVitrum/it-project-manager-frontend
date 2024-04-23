import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/login";

const initialState: AuthState = {
    user: localStorage.getItem('user') || null,
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.token = accessToken;
            state.refreshToken = refreshToken;
            localStorage.setItem('user', user);
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentRefreshToken = (state) => state.auth.refreshToken
