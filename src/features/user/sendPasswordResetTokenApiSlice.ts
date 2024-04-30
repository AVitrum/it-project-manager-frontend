import { apiSlice } from "../../app/api/apiSlice";

export const sendPasswordResetTokenApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        sendPasswordResetToken: builder.mutation({
            query: data => ({
                url: '/api/user/sendResetPasswordToken',
                method: 'POST',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useSendPasswordResetTokenMutation
} = sendPasswordResetTokenApiSlice;
