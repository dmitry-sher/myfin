import React, { FC } from "react";

import { useAppContext } from "../../context/AppContext";
import { MonthTotalsContext } from "../../context/MonthTotalsContext";
import { Transaction } from "../../types/entities";
import { ViewPieChartButton } from "../Analytics/ViewPieChartButton";
import { ViewTotalChartButton } from "../Analytics/ViewTotalChartButton";
import { ViewTotalsButton } from "../Analytics/ViewTotalsButton";
import { CategoryFilter } from "../Filters/CategoryFilter";

import { TransactionForm } from "./TransactionForm";

type PlanHeaderProps = {
  addTransaction: (
    planId: string,
    transaction: Omit<Transaction, "id">
  ) => void;
};

export const PlanHeader: FC<PlanHeaderProps> = ({ addTransaction }) => {
  const { selectedPlan, setCategoriesFilter } = useAppContext();
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
        <div className="flex w-1/2">
          <h2 className="text-xl mr-4">
            Plan: {selectedPlan.name}
            <span className="text-green-600 ml-2">
              (Balance:{" "}
              {selectedPlan.transactions.reduce((acc, t) => acc + t.amount, 0)})
            </span>
          </h2>
          <ViewTotalsButton />
          <ViewPieChartButton />
          <ViewTotalChartButton />
        </div>
        <CategoryFilter className="w-1/2" onChange={setCategoriesFilter} />
      </div>

      <TransactionForm
        onAddTransaction={(transaction): void =>
          addTransaction(selectedPlan.id, transaction)
        }
      />
    </MonthTotalsContext.Provider>
  );
};
