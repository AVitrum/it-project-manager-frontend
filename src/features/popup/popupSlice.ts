import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { PopupState } from '../../types/states';

const initialState: PopupState = {
    isActive: false
};

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setActive: function (state, action) {
            state.isActive = action.payload;
        },
    },
});

export const { setActive } = popupSlice.actions;

export default popupSlice.reducer;

export const selectPopup = (state: RootState) => state.popup;
export const selectActive = (state: RootState) => state.popup.isActive;
