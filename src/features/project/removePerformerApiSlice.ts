import { apiSlice } from "../../app/api/apiSlice";

export const removeFromProjectApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        removeFromProject: builder.mutation({
            query: data => ({
                url: `/api/project/${data.id}/removePerformer`,
                method: 'DELETE',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useRemoveFromProjectMutation,
} = removeFromProjectApiSlice;
