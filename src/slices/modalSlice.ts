import { createSlice } from "@reduxjs/toolkit";

import { Transaction } from "../types/entities";

interface ModalState {
  modalState: Record<string, boolean>;
  repeatTransaction?: Transaction;
}

const initialState: ModalState = {
  modalState: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, { payload }: { payload: string }) => {
      state.modalState[payload] = true;
    },
    closeModal: (state, { payload }: { payload: string }) => {
      state.modalState[payload] = false;
    },
    setTransactionForRepeat: (state, { payload }: { payload: Transaction }) => {
      state.repeatTransaction = payload;
    },
  },
});

export const { openModal, closeModal, setTransactionForRepeat } =
  modalSlice.actions;
export default modalSlice.reducer;
