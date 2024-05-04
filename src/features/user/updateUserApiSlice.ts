import { apiSlice } from "../../app/api/apiSlice";

export const updateUserApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateInfo: builder.mutation({
            query: data => ({
                url: '/api/user/updateInfo',
                method: 'PUT',
                body: { ...data },
            })
        }),
    }),
});

export const {
    useUpdateInfoMutation
} = updateUserApiSlice;