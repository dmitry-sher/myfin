import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { Plan, Transaction } from "../types/entities";

const initialState: Plan[] = JSON.parse(localStorage.getItem("plans") || "[]");

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    // PLANS
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
          id: uuidv4(),
        })),
      };

      state.push(newPlan);
    },
    exportPlan: (state, action: PayloadAction<string>) => {
      const planId = action.payload;
      const plan = state.find((p) => p.id === planId);

      if (!plan) {
        console.error("Plan not found");
        return;
      }

      const jsonPlan = JSON.stringify(plan, null, 2);
      const blob = new Blob([jsonPlan], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${plan.name}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    importPlanTransactions: (
      state,
      action: PayloadAction<{ planId: string; transactions: Transaction[] }>
    ) => {
      const { planId, transactions } = action.payload;
      const plan = state.find((p) => p.id === planId);

      if (plan) {
        plan.transactions = transactions.map((transaction) => ({
          ...transaction,
          id: uuidv4(),
        }));
      }
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
    removePlan: (state, action: PayloadAction<string>) => {
      const planId = action.payload;
      const planIndex = state.findIndex((plan) => plan.id === planId);

      if (planIndex !== -1) {
        state.splice(planIndex, 1);
      }
    },

    // TRANSACTIONS
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
  },
});

export const {
  addPlan,
  copyPlan,
  exportPlan,
  importPlanTransactions,
  renamePlan,
  removePlan,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = plansSlice.actions;

export default plansSlice.reducer;
