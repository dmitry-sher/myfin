import React, { FC } from "react";

import { MonthTotalsContext } from "../../context/MonthTotalsContext";
import { useAppSelector } from "../../store";
import { Transaction } from "../../types/entities";
import { ViewPieChartButton } from "../TransactionMonthButtons/ViewPieChartButton";
import { ViewTotalsButton } from "../TransactionMonthButtons/ViewTotalsButton";

import { TransactionForm } from "./TransactionForm";

type PlanHeaderProps = {
  addTransaction: (
    planId: string,
    transaction: Omit<Transaction, "id">
  ) => void;
};

export const PlanHeader: FC<PlanHeaderProps> = ({
  addTransaction,
}) => {
  const selectedPlan = useAppSelector((state) => state.appState.selectedPlan);
  if (!selectedPlan) {
    return null;
  }

  return (
    <MonthTotalsContext.Provider
      value={{
        monthTransactions: selectedPlan.transactions,
        startingBalance: 0,
        monthKey: "Full plan",
      }}
    >
      <div className="flex items-center justify-start mb-4 mt-4">
        <h2 className="text-xl mr-4">
          Plan: {selectedPlan.name}
          <span className="text-green-600 ml-2">
            (Balance:{" "}
            {selectedPlan.transactions.reduce((acc, t) => acc + t.amount, 0)})
          </span>
        </h2>

        <ViewTotalsButton />
        <ViewPieChartButton />
      </div>

      <TransactionForm
        onAddTransaction={(transaction): void =>
          addTransaction(selectedPlan.id, transaction)
        }
      />
    </MonthTotalsContext.Provider>
  );
};
