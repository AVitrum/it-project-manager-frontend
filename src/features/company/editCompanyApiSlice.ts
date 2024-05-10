import { apiSlice } from "../../app/api/apiSlice";

export const editCompanyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        editCompany: builder.mutation({
            query: data => ({
                url: `/api/company/${data.id}/updateCompany`,
                method: 'PUT',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useEditCompanyMutation,
} = editCompanyApiSlice;
