import React, { FC } from "react";

import { useAppContext } from "../../context/AppContext";
import { MonthTotalsContext } from "../../context/MonthTotalsContext";
import { Transaction } from "../../types/entities";
import { CategoryFilter } from "../Filters/CategoryFilter";
import { ExpandPlanButton } from "../IconButton/ExpandPlanButton";
import { ViewPieChartButton } from "../IconButton/ViewPieChartButton";
import { ViewTotalChartButton } from "../IconButton/ViewTotalChartButton";
import { ViewTotalsButton } from "../IconButton/ViewTotalsButton";

import { TransactionForm } from "./TransactionForm";

type PlanHeaderProps = {
  addTransaction: (
    planId: string,
    transaction: Omit<Transaction, "id">
  ) => void;
};

export const PlanHeader: FC<PlanHeaderProps> = ({ addTransaction }) => {
  const {
    selectedPlan,
    setCategoriesFilter,
    setIsHeaderExpanded,
    isHeaderExpanded,
  } = useAppContext();
  if (!selectedPlan) {
    return null;
  }

  const handlePlanTitleClick = (): void => {
    setIsHeaderExpanded(!isHeaderExpanded);
  };

  const wrapperClass = [
    "flex items-center justify-between mb-4",
    isHeaderExpanded ? "pt-4" : "pt-2",
  ].join(" ");

  return (
    <MonthTotalsContext.Provider
      value={{
        monthTransactions: selectedPlan.transactions,
        startingBalance: 0,
        monthKey: "Full plan",
      }}
    >
      <div className={wrapperClass}>
        <div className="flex w-1/4">
          <h2
            className="text-xl mr-4 cursor-pointer"
            title="Expand plan selector"
            onClick={handlePlanTitleClick}
          >
            Plan: {selectedPlan.name}
            <span className="text-green-600 ml-2">
              (Balance:{" "}
              {selectedPlan.transactions.reduce((acc, t) => acc + t.amount, 0)})
            </span>
          </h2>
        </div>
        <CategoryFilter className="w-1/2" onChange={setCategoriesFilter} />
        <div className="flex justify-end ml-4 w-1/4">
          <ViewTotalsButton size="lg" />
          <ViewPieChartButton size="lg" />
          <ViewTotalChartButton size="lg" />
          <ExpandPlanButton size="lg" />
        </div>
      </div>

      <TransactionForm
        onAddTransaction={(transaction): void =>
          addTransaction(selectedPlan.id, transaction)
        }
      />
    </MonthTotalsContext.Provider>
  );
};
