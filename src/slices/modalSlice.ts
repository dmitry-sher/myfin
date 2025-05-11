import { createSlice } from "@reduxjs/toolkit";

import { Transaction } from "../types/entities";

type TotalsData = {
  monthKey?: string;
  totalsTransactions?: Transaction[];
  totalsStartingBalance?: number;
};

interface ModalState {
  modalState: Record<string, boolean>;
  repeatTransaction?: Transaction;
  totalsData: TotalsData;
}

const initialState: ModalState = {
  modalState: {},
  totalsData: {},
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
    setTotalsData: (state, { payload }: { payload: TotalsData }) => {
      state.totalsData = payload;
    },
  },
});

export const {
  closeModal,
  openModal,
  setTotalsData,
  setTransactionForRepeat,
} = modalSlice.actions;
export default modalSlice.reducer;
