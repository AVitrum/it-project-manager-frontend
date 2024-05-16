import { apiSlice } from "../../app/api/apiSlice";

export const addCommentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addComment: builder.mutation({
            query: ( data ) => ({
                url: `/api/assignment/${data.id}/addComment`,
                method: 'POST',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useAddCommentMutation,
} = addCommentApiSlice;

