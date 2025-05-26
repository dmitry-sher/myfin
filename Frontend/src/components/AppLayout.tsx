import React, { FC } from "react";

import { useAppContext } from "../context/AppContext";
import {
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../slices/plansSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { Transaction } from "../types/entities";
import { findAndSelectPlan } from "../utils/findAndSelectPlan";

import { PlanHeader } from "./Plans/PlanHeader";
import { PlanSelector } from "./Plans/PlanSelector";
import { PlanView } from "./Plans/PlanView";
import { Header } from "./Header";

export const AppLayout: FC = () => {
  const dispatch = useAppDispatch();
  const plans = useAppSelector((state) => state.plans);
  const { isHeaderSticky, setSelectedPlanId } = useAppContext();

  const handleAddTransaction = (
    planId: string,
    transaction: Omit<Transaction, "id">
  ): void => {
    dispatch(addTransaction({ planId, transaction }));
  };

  const handleUpdateTransaction = (
    planId: string,
    updatedTransaction: Transaction
  ): void => {
    dispatch(updateTransaction({ planId, updatedTransaction }));
  };

  const handleDeleteTransaction = (planId: string, id: string): void => {
    dispatch(deleteTransaction({ planId, transactionId: id }));
  };

  const handleSelectPlan = (planId: string): void => {
    findAndSelectPlan(setSelectedPlanId, planId);
  };

  const wrapperClass = isHeaderSticky
    ? "overflow-y-auto h-[calc(100vh-25px)] print:overflow-hidden print:h-auto px-4 sm:px-6 "
    : "p-4 sm:p-6";

  const headerClass = isHeaderSticky
    ? "sticky top-0 z-10 bg-white border-b shadow-sm"
    : "";

  return (
    <div className="min-h-screen bg-gray-100 p-0 print:p-2">
      <div className="mx-auto bg-white shadow-md rounded-lg print:p-0 print:shadow-none print:m-0">
        <div className={wrapperClass}>
          <div className={`print:hidden ${headerClass}`}>
            <Header />
            <PlanSelector plans={plans} onSelectPlan={handleSelectPlan} />

            <PlanHeader addTransaction={handleAddTransaction} />
          </div>

          <PlanView
            updateTransaction={handleUpdateTransaction}
            deleteTransaction={handleDeleteTransaction}
          />
        </div>
      </div>
    </div>
  );
};
