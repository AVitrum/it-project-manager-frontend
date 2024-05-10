import { apiSlice } from "../../app/api/apiSlice";

export const createCompanyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createCompany: builder.mutation({
            query: data => ({
                url: '/api/company/create',
                method: 'POST',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useCreateCompanyMutation,
} = createCompanyApiSlice;
