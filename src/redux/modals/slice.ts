import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, ModalTypes } from "../types";

const initialState: RootState["modals"] = {
  isShown: false,
  modalName: null,
};

const modals = createSlice({
  name: "modals",
  initialState,
  reducers: {
    show: (state, action: PayloadAction<ModalTypes | null>) => {
      state.isShown = true;
      state.modalName = action.payload;
    },

    hide: state => {
      state.isShown = false;
      state.modalName = null;
    },
  },
});

export const { show, hide } = modals.actions;
export default modals.reducer; 
