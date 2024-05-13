import { apiSlice } from '../../app/api/apiSlice';

export const getProjectApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProject: builder.query({
            query: ({ id }) => `/api/project/${id}`,
        }),
    })
});

export const {
    useGetProjectQuery
} = getProjectApiSlice;