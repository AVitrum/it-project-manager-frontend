import { apiSlice } from "../../app/api/apiSlice";

export const updatePositionInCompany = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updatePosition: builder.mutation({
            query: data => ({
                url: `/api/company/${data.id}/updatePosition`,
                method: 'PUT',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useUpdatePositionMutation,
} = updatePositionInCompany;
