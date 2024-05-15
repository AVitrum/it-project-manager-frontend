import { apiSlice } from '../../app/api/apiSlice';

export const getTaskApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTask: builder.query({
            query: ({ id }) => `/api/assignment/${id}`,
        }),
    })
});

export const {
    useGetTaskQuery
} = getTaskApiSlice;