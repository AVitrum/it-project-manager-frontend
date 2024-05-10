import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AuthState } from "../../types/states";

const initialState: AuthState = {
    username: localStorage.getItem('username') || null,
    email: localStorage.getItem('email') || null,
    image: localStorage.getItem('image') || undefined,
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo: function (state, action) {
            const { username, image, email } = action.payload;
            state.username = username;
            state.image = image;
            state.email = email;
            localStorage.setItem('username', username);
            localStorage.setItem('image', image);
            localStorage.setItem('email', email);
        },

        setCredentials: function (state, action) {
            const { accessToken, refreshToken } = action.payload;
            state.token = accessToken;
            state.refreshToken = refreshToken;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        },
        logOut: function (state) {
            state.username = null;
            state.email = null;
            state.token = null;
            state.refreshToken = null;
            state.image = undefined;
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('image');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');

            window.location.assign("/");
        },
    },
});

export const { setCredentials, setUserInfo, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.username;
export const selectCurrentEmail = (state: RootState) => state.auth.email;
export const selectCurrentImage = (state: RootState) => state.auth.image;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentRefreshToken = (state: RootState) => state.auth.refreshToken;
