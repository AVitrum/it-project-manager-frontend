import { apiSlice } from "../../app/api/apiSlice";

export const uploadPhotoApiSlice = apiSlice.injectEndpoints({
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
} = uploadPhotoApiSlice;