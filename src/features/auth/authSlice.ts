import { createSlice } from "@reduxjs/toolkit"

const initialState: AuthState = { user: null, token: null, refreshToken: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload
            state.user = user
            state.token = accessToken
            state.refreshToken = refreshToken
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
            state.refreshToken = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentRefreshToken = (state) => state.auth.token