import { createSlice } from '@reduxjs/toolkit';

export interface Popup {
  id: string;
  isOpen: boolean;
}

export interface PopupState {
  popupList: Popup[];
}

const initialPopupState: PopupState = {
  popupList: [],
};

const PopupSliceReducer = createSlice({
  name: 'popupSlice',
  initialState: initialPopupState,
  reducers: {
    openPopup: (state: PopupState, action: { payload: string }) => {
      if (!state.popupList.find((popup) => popup.id === action.payload)) {
        return {
          ...state,
          popupList: [...state.popupList, { id: action.payload, isOpen: true }],
        };
      }
      return {
        ...state,
        popupList: state.popupList.map((popup) =>
          popup.id === action.payload ? { id: popup.id, isOpen: true } : popup
        ),
      };
    },
    closePopup: (state: PopupState, action: { payload: string }) => {
      return {
        ...state,
        popupList: state.popupList.map((popup) =>
          popup.id === action.payload ? { id: popup.id, isOpen: false } : popup
        ),
      };
    },
  },
});

export default PopupSliceReducer.reducer;

export const { openPopup, closePopup } = PopupSliceReducer.actions;
