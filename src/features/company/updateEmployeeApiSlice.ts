import { apiSlice } from "../../app/api/apiSlice";

export const updateEmployeeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateEmployee: builder.mutation({
            query: data => ({
                url: `/api/company/${data.id}/updateEmployee`,
                method: 'PUT',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useUpdateEmployeeMutation,
} = updateEmployeeApiSlice;
