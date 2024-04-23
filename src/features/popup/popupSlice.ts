import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    active: false,
    openModal: false,
};

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setActive: (state, action) => {
            state.active = action.payload;
        },
        setOpenModal: (state, action) => {
            state.openModal = action.payload;
        },
    },
});

export const { setActive, setOpenModal } = popupSlice.actions;

export default popupSlice.reducer;

export const selectPopup = (state) => state.popup;
export const selectActive = (state) => state.popup.active;
export const selectOpenModal = (state) => state.popup.openModal;
