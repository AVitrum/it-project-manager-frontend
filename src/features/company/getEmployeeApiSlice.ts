import { apiSlice } from '../../app/api/apiSlice';

export const getEmployeeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployee: builder.query({
            query: ({ employeeId }) => `/api/company/getEmployee/${employeeId}`,
        }),
    })
});

export const {
    useGetEmployeeQuery
} = getEmployeeApiSlice;