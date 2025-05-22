import React, { FC, useMemo } from "react";
import { format } from "date-fns";

import { useAppSelector } from "../../store";
import { Transaction } from "../../types/entities";
import { monthKeyFormat } from "../../utils/const";
import { groupTransactions } from "../../utils/groupTransactions";
import { sortTransactions } from "../../utils/sortTransactions";
import { TransactionMonth } from "../Transactions/TransactionMonth";

type PlanViewProps = {
  updateTransaction: (planId: string, updatedTransaction: Transaction) => void;
  deleteTransaction: (planId: string, id: string) => void;
};

export const PlanView: FC<PlanViewProps> = ({
  updateTransaction,
  deleteTransaction,
}) => {
  const selectedPlanId =
    useAppSelector((state) => state.appState.selectedPlan)?.id ?? "";
  const selectedPlan = useAppSelector((state) =>
    state.plans.find((p) => p.id === selectedPlanId)
  );
  const handleUpdateTransaction = (transaction: Transaction): void =>
    updateTransaction(selectedPlanId, transaction);

  const handleDeleteTransaction = (id: string): void =>
    deleteTransaction(selectedPlanId, id);

  const transactionsByMonth = useMemo(
    () => groupTransactions(sortTransactions(selectedPlan?.transactions ?? [])),
    [selectedPlan?.transactions]
  );

  if (!selectedPlan) {
    return null;
  }

  const currentMonthKey = format(new Date(), monthKeyFormat);
  let runningBalance = 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between font-semibold p-2 border-b mb-6">
        <div className="sm:w-2/5 w-full flex">
          <span className="sm:w-1/2 w-1/5">Date</span>
          <span className="sm:w-1/2 w-4/5 text-center">Description</span>
        </div>
        <div className="sm:w-3/5 w-full flex">
          <span className="w-1/3 sm:text-right">Amount</span>
          <span className="w-1/3 sm:text-right">Balance</span>
          <span className="print:hidden w-1/3 text-right">Actions</span>
        </div>
      </div>
      <ul className="space-y-2">
        {Object.keys(transactionsByMonth).map((monthKey) => {
          const monthTransactions = transactionsByMonth[monthKey];
          const startingRunningBalance = runningBalance;
          runningBalance = monthTransactions.reduce(
            (acc, next) => acc + next.amount,
            runningBalance
          );

          return (
            <TransactionMonth
              key={monthKey}
              startingRunningBalance={startingRunningBalance}
              onUpdateTransaction={handleUpdateTransaction}
              onDeleteTransaction={handleDeleteTransaction}
              monthKey={monthKey}
              monthTransactions={monthTransactions}
              isCurrentMonth={monthKey === currentMonthKey}
            />
          );
        })}
      </ul>
    </div>
  );
};
