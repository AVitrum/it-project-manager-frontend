import { apiSlice } from '../../app/api/apiSlice';

export const getCompanyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCompany: builder.query({
            query: ({ id }) => `/api/company/${id}`,
        }),
    })
});

export const {
    useGetCompanyQuery
} = getCompanyApiSlice;