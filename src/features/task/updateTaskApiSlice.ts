import { apiSlice } from "../../app/api/apiSlice";

export const updateTaskApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateTask: builder.mutation({
            query: ( data ) => ({
                url: `/api/assignment/${data.id}/update`,
                method: 'PUT',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useUpdateTaskMutation,
} = updateTaskApiSlice;

