import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from '../features/auth/authSlice';
import popupSlice from "../features/popup/popupSlice";
import { AuthState, PopupState } from "../types/states";
import performerSlice from "../features/performer/performerSlice";
import { EmployeeResponse } from "../types/responses";

export type RootState = {
    auth: AuthState,
    popup: PopupState,
    performer: EmployeeResponse,
};

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        popup: popupSlice,
        performer: performerSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})