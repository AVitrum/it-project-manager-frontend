import { apiSlice } from "../../app/api/apiSlice";

export const resetPasswordApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        resetPassword: builder.mutation({
            query: data => ({
                url: '/api/user/resetPassword',
                method: 'PUT',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useResetPasswordMutation
} = resetPasswordApiSlice;
