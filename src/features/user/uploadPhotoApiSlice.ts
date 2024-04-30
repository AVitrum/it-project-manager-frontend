import { apiSlice } from "../../app/api/apiSlice";

export const changePasswordApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        uploadPhoto: builder.mutation({
            query: data => ({
                url: '/api/user/profileImage',
                method: 'PUT',
                body: data,
            })
        }),
    }),
});

export const {
    useUploadPhotoMutation
} = changePasswordApiSlice;