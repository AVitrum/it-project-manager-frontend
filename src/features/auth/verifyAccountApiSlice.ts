import { apiSlice } from "../../app/api/apiSlice";

export const verifyAccountApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        verify: builder.mutation({
            query: data => ({
                url: '/api/auth/verify',
                method: 'POST',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useVerifyMutation
} = verifyAccountApiSlice;
