import { apiSlice } from '../../app/api/apiSlice';

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProfile: builder.query({
            query: () => '/api/user/profile',
        }),
    })
});

export const {
    useGetProfileQuery
} = profileApiSlice;