import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AuthState } from "../../types/states";

const initialState: AuthState = {
    user: localStorage.getItem('user') || null,
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: function(state, action) {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.token = accessToken;
            state.refreshToken = refreshToken;
            localStorage.setItem('user', user);
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        },
        logOut: function(state) {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentRefreshToken = (state: RootState) => state.auth.refreshToken
