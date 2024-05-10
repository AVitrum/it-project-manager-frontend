import { apiSlice } from "../../app/api/apiSlice";

export const addPositionToCompanyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addPositionToCompany: builder.mutation({
            query: data => ({
                url: `/api/company/${data.id}/addPosition`,
                method: 'POST',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useAddPositionToCompanyMutation,
} = addPositionToCompanyApiSlice;
