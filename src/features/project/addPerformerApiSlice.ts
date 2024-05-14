import { apiSlice } from "../../app/api/apiSlice";

export const addPerformerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addToProject: builder.mutation({
            query: data => ({
                url: `/api/project/${data.id}/addPerformer`,
                method: 'POST',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useAddToProjectMutation,
} = addPerformerApiSlice;
