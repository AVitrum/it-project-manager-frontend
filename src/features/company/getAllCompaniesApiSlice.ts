import { apiSlice } from '../../app/api/apiSlice';

export const getAllCompanies = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCompanies: builder.query({
            query: ({ order }) => `/api/company/getAllCompany/${order}`,
        }),
    })
});

export const {
    useGetCompaniesQuery
} = getAllCompanies;