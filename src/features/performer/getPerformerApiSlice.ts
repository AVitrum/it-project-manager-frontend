import { apiSlice } from '../../app/api/apiSlice';

export const getPerformerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPerformer: builder.query({
            query: ({ id }) => `/api/company/${id}/getPerformer`,
        }),
    })
});

export const {
    useGetPerformerQuery
} = getPerformerApiSlice;