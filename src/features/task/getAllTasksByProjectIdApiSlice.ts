import { apiSlice } from '../../app/api/apiSlice';

export const getAllTasksByProjectId = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTasks: builder.query({
            query: ({ id }) => `/api/assignment/${id}/getAll`,
        }),
    })
});

export const {
    useGetTasksQuery
} = getAllTasksByProjectId;