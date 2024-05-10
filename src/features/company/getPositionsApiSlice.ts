import { apiSlice } from '../../app/api/apiSlice';

export const getPositionsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPositions: builder.query({
            query: ({ id }) => `/api/company/${id}/getAllPositions`,
        }),
    })
});

export const {
    useGetPositionsQuery
} = getPositionsApiSlice;