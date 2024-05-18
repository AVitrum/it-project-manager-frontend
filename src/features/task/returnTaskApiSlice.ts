import { apiSlice } from "../../app/api/apiSlice";

export const returnTaskApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        returnTask: builder.mutation({
            query: ( data ) => ({
                url: `/api/assignment/${data.id}/returnAssignment`,
                method: 'PUT',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useReturnTaskMutation,
} = returnTaskApiSlice;

