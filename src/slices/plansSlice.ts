import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Plan, Transaction } from "../types/entities";

const initialState: Plan[] = JSON.parse(localStorage.getItem("plans") || "[]");

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    addPlan: (state, action: PayloadAction<string>) => {
      const newPlanName = action.payload;
      if (state.some((plan) => plan.name === newPlanName)) {
        alert("Plan with this name already exists.");
        return;
      }
      state.push({ id: uuidv4(), name: newPlanName, transactions: [] });
    },
    addTransaction: (
      state,
      action: PayloadAction<{
        planId: string;
        transaction: Omit<Transaction, "id">;
      }>
    ) => {
      const { planId, transaction } = action.payload;
      const plan = state.find((p) => p.id === planId);
      if (plan) {
        plan.transactions.unshift({ ...transaction, id: uuidv4() });
      }
    },
    updateTransaction: (
      state,
      action: PayloadAction<{ planId: string; updatedTransaction: Transaction }>
    ) => {
      const { planId, updatedTransaction } = action.payload;
      const plan = state.find((p) => p.id === planId);
      if (plan) {
        const index = plan.transactions.findIndex(
          (t) => t.id === updatedTransaction.id
        );
        if (index !== -1) {
          plan.transactions[index] = updatedTransaction;
        }
      }
    },
    deleteTransaction: (
      state,
      action: PayloadAction<{ planId: string; transactionId: string }>
    ) => {
      const { planId, transactionId } = action.payload;
      const plan = state.find((p) => p.id === planId);
      if (plan) {
        plan.transactions = plan.transactions.filter(
          (t) => t.id !== transactionId
        );
      }
    },
  },
});

export const { addPlan, addTransaction, updateTransaction, deleteTransaction } =
  plansSlice.actions;

export default plansSlice.reducer;
