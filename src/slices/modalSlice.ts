import { createSlice } from "@reduxjs/toolkit";

import { Transaction } from "../types/entities";

interface ModalState {
  modalState: Record<string, boolean>;
  repeatTransaction?: Transaction;
  totalsTransactions?: Transaction[];
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
    setTotalsTransactions: (state, { payload }: { payload: Transaction[] }) => {
      state.totalsTransactions = payload;
    },
  },
});

export const {
  closeModal,
  openModal,
  setTotalsTransactions,
  setTransactionForRepeat,
} = modalSlice.actions;
export default modalSlice.reducer;
