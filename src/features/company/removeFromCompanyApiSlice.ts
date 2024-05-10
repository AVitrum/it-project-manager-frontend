import { apiSlice } from "../../app/api/apiSlice";

export const removeFromCompanyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        removeFromCompany: builder.mutation({
            query: data => ({
                url: `/api/company/${data.id}/removeEmployee`,
                method: 'DELETE',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useRemoveFromCompanyMutation,
} = removeFromCompanyApiSlice;
