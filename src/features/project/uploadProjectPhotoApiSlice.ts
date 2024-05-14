import { apiSlice } from "../../app/api/apiSlice";

export const uploadProjectImageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        uploadProjectImage: builder.mutation({
            query: data => ({
                url: `/api/project/${data.get("id")}/image`,
                method: 'PUT',
                body: data
            })
        }),
    }),
});

export const {
    useUploadProjectImageMutation
} = uploadProjectImageApiSlice;