import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { PopupState } from '../../types/states';

const initialState: PopupState = {
    active: false,
    openModal: false,
};

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setActive: function(state, action) {
            state.active = action.payload;
        },
        setOpenModal: function(state, action) {
            state.openModal = action.payload;
        },
    },
});

export const { setActive, setOpenModal } = popupSlice.actions;

export default popupSlice.reducer;

export const selectPopup = (state: RootState) => state.popup;
export const selectActive = (state: RootState) => state.popup.active;
export const selectOpenModal = (state: RootState) => state.popup.openModal;
