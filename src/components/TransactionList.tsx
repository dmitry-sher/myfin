import React, { FC, useMemo } from "react";

import { Transaction } from "../types/entities";
import { groupTransactions } from "../utils/groupTransactions";
import { sortTransactions } from "../utils/sortTransactions";

// import TransactionItem from "./TransactionItem";
import TransactionMonth from "./TransactionMonth";

interface TransactionListProps {
  transactions: Transaction[];
  onUpdateTransaction: (updatedTransaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
}

export const TransactionList: FC<TransactionListProps> = ({
  transactions,
  onUpdateTransaction,
  onDeleteTransaction,
}) => {
  const transactionsByMonth = useMemo(
    () => groupTransactions(sortTransactions(transactions)),
    [transactions]
  );

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
          <span className="w-1/3 text-right">Actions</span>
        </div>
      </div>
      <ul className="space-y-2">
        {Object.keys(transactionsByMonth).map((monthKey) => {
          const monthTransactions = transactionsByMonth[monthKey];
          const startingRunningBalance = runningBalance;
          runningBalance += monthTransactions.reduce((acc, next) => acc + next.amount, runningBalance);

          return (
            <TransactionMonth
              key={monthKey}
              startingRunningBalance={startingRunningBalance}
              onUpdateTransaction={onUpdateTransaction}
              onDeleteTransaction={onDeleteTransaction}
              monthKey={monthKey}
              monthTransactions={monthTransactions}
            />
          );

          // let monthlyInTotal = 0;
          // let monthlyOutTotal = 0;

          // return (
          //   <div key={monthKey}>
          //     <div className="text-center font-semibold p-2 border-b">
          //       {monthKey}
          //     </div>
          //     {monthTransactions.map((transaction) => {
          //       runningBalance += transaction.amount;

          //       if (transaction.amount > 0) {
          //         monthlyInTotal += transaction.amount;
          //       } else {
          //         monthlyOutTotal += transaction.amount;
          //       }

          //       return (
          //         <TransactionItem
          //           key={transaction.id}
          //           transaction={transaction}
          //           balance={runningBalance}
          //           onUpdateTransaction={onUpdateTransaction}
          //           onDeleteTransaction={onDeleteTransaction}
          //         />
          //       );
          //     })}
          //     <div className="flex flex-col sm:flex-row justify-between font-semibold p-2 mb-6">
          //       <div className="sm:w-2/5 w-full flex">
          //         <span className="hidden sm:block sm:w-1/2 w-1/5"></span>
          //         <span className="sm:w-1/2 w-full text-center">
          //           {monthKey} Totals
          //         </span>
          //       </div>
          //       <div className="sm:w-3/5 w-full flex">
          //         <span className="w-1/2 sm:text-right">
          //           In: {monthlyInTotal.toFixed(2)}
          //         </span>
          //         <span className="w-1/2 text-right">
          //           Out: {monthlyOutTotal.toFixed(2)}
          //         </span>
          //       </div>
          //     </div>
          //   </div>
          // );
        })}
      </ul>
    </div>
  );
};

export default TransactionList;
