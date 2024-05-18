import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { EmployeeResponse } from '../../types/responses';

const initialState: EmployeeResponse = {
    id: -1,
    username: localStorage.getItem('performerUsername') || '',
    email: localStorage.getItem('performerUsername') || '',
    position: localStorage.getItem('performerPosition') || '',
    salary: 0,
    picture: undefined,
    permissions: localStorage.getItem('permissions') || {
        name: '',
        priority: 0,
        createProject: false,
        updateProject: false,
        deleteProject: false,
        addUser: false,
        updateUser: false,
        deleteUser: false,
        addBudget: false,
        updateBudget: false,
        createPosition: false,
        updatePosition: false,
        createTask: false,
        updateTask: false,
        deleteTask: false
    }
};

const performerSlice = createSlice({
    name: 'performer',
    initialState,
    reducers: {
        setData: function (state, action) {
            const { id, username, email, position, salary, picture, permissions } = action.payload;
            state.id = id;
            state.username = username;
            state.email = email;
            state.salary = salary;
            state.position = position;
            state.picture = picture;
            state.permissions = permissions;

            localStorage.setItem('performerId', id);
            localStorage.setItem('performerPosition', position);
            localStorage.setItem('performerUsername', username);
            localStorage.setItem('performerPicture', picture);
            localStorage.setItem('performerEmail', email);
            localStorage.setItem('permissions', permissions);
        },
    },
});

export const { setData } = performerSlice.actions;

export default performerSlice.reducer;

export const selectPermissions = (state: RootState) => state.performer.permissions;
// export const selectActive = (state: RootState) => state.performer.isActive;
