import { apiSlice } from "../../app/api/apiSlice";

export const createProjectApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createProject: builder.mutation({
            query: ( data ) => ({
                url: `/api/project/${data.id}/createProject`,
                method: 'POST',
                body: { ...data }
            })
        }),
    }),
});

export const {
    useCreateProjectMutation,
} = createProjectApiSlice;

