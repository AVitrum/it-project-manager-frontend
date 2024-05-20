import { apiSlice } from "../../app/api/apiSlice";

export const importTasksApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        importTask: builder.mutation({
            query: (data) => ({
                url: `/api/assignment/${data.id}/importAllAssignmentsToCalendar`,
                method: 'POST',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useImportTaskMutation,
} = importTasksApiSlice;

