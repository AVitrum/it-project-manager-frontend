import { apiSlice } from "../../app/api/apiSlice";

export const deleteProjectApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        deleteProject: builder.mutation({
            query: data => ({
                url: `/api/project/${data.id}/delete`,
                method: 'DELETE',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useDeleteProjectMutation,
} = deleteProjectApiSlice;
