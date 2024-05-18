import { apiSlice } from "../../app/api/apiSlice";

export const addTaskApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addToTask: builder.mutation({
            query: data => ({
                url: `/api/assignment/${data.id}/addPerformer`,
                method: 'POST',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useAddToTaskMutation,
} = addTaskApiSlice;
