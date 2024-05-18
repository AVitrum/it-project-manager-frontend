import { apiSlice } from "../../app/api/apiSlice";

export const markCompletedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        markAsCompleted: builder.mutation({
            query: ( data ) => ({
                url: `/api/assignment/${data.id}/markAsCompleted`,
                method: 'PUT',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useMarkAsCompletedMutation,
} = markCompletedApiSlice;

