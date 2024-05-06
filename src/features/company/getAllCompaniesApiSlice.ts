import { apiSlice } from '../../app/api/apiSlice';

export const getAllCompanies = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCompanies: builder.query({
            query: () => '/api/company',
        }),
    })
});

export const {
    useGetCompaniesQuery
} = getAllCompanies;