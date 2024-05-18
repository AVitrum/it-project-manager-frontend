import { apiSlice } from "../../app/api/apiSlice";

export const uploadFileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        uploadFile: builder.mutation({
            query: data => ({
                url: `/api/assignment/${data.get("id")}/addFile`,
                method: 'POST',
                body: data
            })
        }),
    }),
});

export const {
    useUploadFileMutation
} = uploadFileApiSlice;