import { apiSlice } from "../../app/api/apiSlice";

export const createTaskApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createTask: builder.mutation({
            query: ( data ) => ({
                url: `/api/assignment/${data.id}/createAssignment`,
                method: 'POST',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useCreateTaskMutation,
} = createTaskApiSlice;

