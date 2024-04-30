import { apiSlice } from "../../app/api/apiSlice";

export const changePasswordApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        changePassword: builder.mutation({
            query: data => ({
                url: '/api/user/changePassword',
                method: 'PUT',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useChangePasswordMutation
} = changePasswordApiSlice;
