import { apiSlice } from "../../app/api/apiSlice";

export const sendVerificationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        sendVerification: builder.mutation({
            query: data => ({
                url: '/api/auth/sendToken',
                method: 'POST',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useSendVerificationMutation
} = sendVerificationApiSlice;
