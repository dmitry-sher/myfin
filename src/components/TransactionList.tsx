import React, { FC } from "react";

import { Transaction } from "../types/entities";

import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  onUpdateTransaction: (updatedTransaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
}

export const TransactionList: FC<TransactionListProps> = ({
  transactions,
  onUpdateTransaction,
  onDeleteTransaction
}) => {
  const parseDate = (dateStr: string): Date => {
    const [day, month] = dateStr.split("/").map(Number);
    return new Date(new Date().getFullYear(), month - 1, day);
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    return parseDate(a.date).getTime() - parseDate(b.date).getTime();
  });

  let runningBalance = 0;

  return (
    <div>
      <div className="flex justify-between font-semibold p-2 border-b">
        <span className="w-1/5">Date</span>
        <span className="w-1/5">Description</span>
        <span className="w-1/5 text-right">Amount</span>
        <span className="w-1/5 text-right">Balance</span>
        <span className="w-1/5 text-right">Actions</span>
      </div>
      <ul className="space-y-2">
        {sortedTransactions.map((transaction) => {
          runningBalance += transaction.amount;

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
      </ul>
    </div>
  );
};

export default TransactionList;
