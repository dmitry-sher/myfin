import React, { FC, useEffect, useRef } from "react";

import { Transaction } from "../types/entities";

import { TransactionItem } from "./TransactionItem";
import { ViewAmount } from "./ViewAmount";

interface TransactionMonthProps {
  monthKey: string;
  monthTransactions: Transaction[];
  onUpdateTransaction: (updatedTransaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
  startingRunningBalance: number;
  isCurrentMonth?: boolean;
}

export const TransactionMonth: FC<TransactionMonthProps> = ({
  monthKey,
  monthTransactions,
  onUpdateTransaction,
  onDeleteTransaction,
  startingRunningBalance,
  isCurrentMonth = false
}) => {
  let monthlyInTotalPlan = 0;
  let monthlyOutTotalPlan = 0;
  let monthlyInTotalFact = 0;
  let monthlyOutTotalFact = 0;
  let runningBalance = startingRunningBalance;
  let monthBalance = 0;
  let monthBalanceFact = 0;
  const isAllDone = monthTransactions.reduce(
    (acc, next) => acc && next.isDone,
    true
  );
  const isNoneDone = !monthTransactions.reduce(
    (acc, next) => acc || next.isDone,
    false
  );
  const showPlanFact = !(isAllDone || isNoneDone);

  const monthRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isCurrentMonth && monthRef.current) {
      monthRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isCurrentMonth]);

  const divRef = isCurrentMonth ? monthRef : null;

  return (
    <div key={monthKey} id={`month-${monthKey}`} ref={divRef}>
      <div className="text-center font-semibold p-2 border-b">{monthKey}</div>
      {monthTransactions.map((transaction) => {
        runningBalance += transaction.amount;
        monthBalance += transaction.amount;
        if (transaction.isDone) {
          monthBalanceFact += transaction.amount;
        }

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
        <div className="sm:w-1/5 w-full flex">
          <span className="hidden sm:block sm:w-1/2 w-1/5"></span>
          <span className="sm:w-1/2 w-full text-center"><span className="print:hidden">{monthKey}</span> Totals</span>
        </div>
        <div className="sm:w-4/5 w-full flex">
          <ViewAmount
            className="w-1/3 sm:text-right"
            balancePlan={monthlyInTotalPlan}
            balanceFact={monthlyInTotalFact}
            showPlanFact={showPlanFact}
            label="In"
          />
          <ViewAmount
            className="w-1/3 text-right"
            balancePlan={monthlyOutTotalPlan}
            balanceFact={monthlyOutTotalFact}
            showPlanFact={showPlanFact}
            label="Out"
          />
          <ViewAmount
            className="w-1/3 text-right"
            balancePlan={monthBalance}
            balanceFact={monthBalanceFact}
            showPlanFact={showPlanFact}
            label="Balance"
          />
        </div>
      </div>
    </div>
  );
};
