import { apiSlice } from "../../app/api/apiSlice";

export const addToCompanyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addToCompany: builder.mutation({
            query: data => ({
                url: `/api/company/${data.id}/addEmployee`,
                method: 'POST',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useAddToCompanyMutation,
} = addToCompanyApiSlice;
