import { apiSlice } from "../../app/api/apiSlice";

export const uploadCompanyPictureApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        uploadCompanyPicture: builder.mutation({
            query: data => ({
                url: `/api/company/${data.get("id")}/image`,
                method: 'PUT',
                body: data
            })
        }),
    }),
});

export const {
    useUploadCompanyPictureMutation
} = uploadCompanyPictureApiSlice;