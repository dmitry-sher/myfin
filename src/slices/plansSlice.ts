import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { Plan, Transaction } from "../types/entities";

const initialState: Plan[] = JSON.parse(localStorage.getItem("plans") || "[]");

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    addPlan: (
      state,
      action: PayloadAction<{
        newPlanName: string;
        newPlanId: string;
      }>
    ) => {
      const { newPlanName, newPlanId } = action.payload;
      if (state.some((plan) => plan.name === newPlanName)) {
        return;
      }
      state.push({ id: newPlanId, name: newPlanName, transactions: [] });
    },
    copyPlan: (
      state,
      action: PayloadAction<{
        planId: string;
        newPlanName: string;
        newPlanId: string;
      }>
    ) => {
      const { planId, newPlanName, newPlanId } = action.payload;
      const existingPlan = state.find((p) => p.id === planId);

      if (!existingPlan) {
        return;
      }

      if (state.some((plan) => plan.name === newPlanName)) {
        alert("Plan with this name already exists.");
        return;
      }

      const newPlan = {
        ...existingPlan,
        id: newPlanId,
        name: newPlanName,
        transactions: existingPlan.transactions.map((t) => ({
          ...t,
          id: uuidv4()
        }))
      };

      state.push(newPlan);
    },
    renamePlan: (
      state,
      action: PayloadAction<{ planId: string; newName: string }>
    ) => {
      const { planId, newName } = action.payload;
      const plan = state.find((p) => p.id === planId);
      if (plan) {
        plan.name = newName;
      }
    },
    // Add this to your plansSlice
    removePlan: (state, action: PayloadAction<string>) => {
      const planId = action.payload;
      const planIndex = state.findIndex((plan) => plan.id === planId);

      if (planIndex !== -1) {
        state.splice(planIndex, 1);
      }
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
    }
  }
});

export const {
  addPlan,
  copyPlan,
  renamePlan,
  removePlan,
  addTransaction,
  updateTransaction,
  deleteTransaction
} = plansSlice.actions;

export default plansSlice.reducer;
