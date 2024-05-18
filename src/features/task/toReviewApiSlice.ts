import { apiSlice } from "../../app/api/apiSlice";

export const toReviewApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        toReview: builder.mutation({
            query: ( data ) => ({
                url: `/api/assignment/${data.id}/toReview`,
                method: 'PUT',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useToReviewMutation,
} = toReviewApiSlice;

