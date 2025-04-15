import React, { FC } from "react";

import { Transaction } from "../types/entities";

import TransactionItem from "./TransactionItem";

interface TransactionMonthProps {
  monthKey: string;
  monthTransactions: Transaction[];
  onUpdateTransaction: (updatedTransaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
  startingRunningBalance: number;
}

export const TransactionMonth: FC<TransactionMonthProps> = ({
  monthKey,
  monthTransactions,
  onUpdateTransaction,
  onDeleteTransaction,
  startingRunningBalance,
}) => {
  let monthlyInTotalPlan = 0;
  let monthlyOutTotalPlan = 0;
  let monthlyInTotalFact = 0;
  let monthlyOutTotalFact = 0;
  let runningBalance = startingRunningBalance;
  const isAllDone = monthTransactions.reduce(
    (acc, next) => acc && next.isDone,
    true
  );
  const isNoneDone = !monthTransactions.reduce(
    (acc, next) => acc || next.isDone,
    false
  );
  const showPlanFact = !(isAllDone || isNoneDone);

  return (
    <div key={monthKey}>
      <div className="text-center font-semibold p-2 border-b">{monthKey}</div>
      {monthTransactions.map((transaction) => {
        runningBalance += transaction.amount;

        if (transaction.amount > 0) {
          if (transaction.isDone) {
            monthlyInTotalFact += transaction.amount;
          }
          monthlyInTotalPlan += transaction.amount;
        }
        if (transaction.amount <= 0) {
          if (transaction.isDone) {
            monthlyOutTotalFact += transaction.amount;
          }
          monthlyOutTotalPlan += transaction.amount;
        }

        return (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            balance={runningBalance}
            onUpdateTransaction={onUpdateTransaction}
            onDeleteTransaction={onDeleteTransaction}
          />
        );
      })}
      <div className="flex flex-col sm:flex-row justify-between font-semibold p-2 mb-6">
        <div className="sm:w-2/5 w-full flex">
          <span className="hidden sm:block sm:w-1/2 w-1/5"></span>
          <span className="sm:w-1/2 w-full text-center">{monthKey} Totals</span>
        </div>
        <div className="sm:w-3/5 w-full flex">
          <span className="w-1/2 sm:text-right">
            In: {monthlyInTotalPlan.toFixed(2)}
            {showPlanFact ? ` / ${monthlyInTotalFact.toFixed(2)}` : ""}
          </span>
          <span className="w-1/2 text-right">
            Out: {monthlyOutTotalPlan.toFixed(2)}
            {showPlanFact ? ` / ${monthlyOutTotalFact.toFixed(2)}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionMonth;
