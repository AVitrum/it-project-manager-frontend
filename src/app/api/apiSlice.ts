import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/auth/authSlice';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:8080',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

async function baseQueryWithReauth(args: string | FetchArgs, api: BaseQueryApi, extraOptions: any) {
    let result = await baseQuery(args, api, extraOptions);

    if ((result.error as FetchBaseQueryError)?.status === 401) {
        console.log('sending refresh token');
        const refreshToken = (api.getState() as RootState).auth.refreshToken;
        const refreshResult = await baseQuery('api/auth/refresh', api, {
            ...extraOptions,
            body: JSON.stringify({ refreshToken })
        });
        console.log(refreshResult);
        if (refreshResult?.data) {
            const user = (api.getState() as RootState).auth.user;
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: _builder => ({}),
});
