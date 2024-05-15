import { apiSlice } from "../../app/api/apiSlice";

export const updateProjectApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateProject: builder.mutation({
            query: data => ({
                url: `/api/project/${data.id}/update`,
                method: 'PUT',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useUpdateProjectMutation,
} = updateProjectApiSlice;
