import React from "react";
import TransactionItem from "./TransactionItem";

function TransactionList({
  transactions,
  onUpdateTransaction,
  onDeleteTransaction,
}) {
  const parseDate = (dateStr) => {
    const [day, month] = dateStr.split("/").map(Number);
    return new Date(new Date().getFullYear(), month - 1, day);
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    return parseDate(a.date) - parseDate(b.date);
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
        {sortedTransactions.map((transaction, index) => {
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
}

export default TransactionList;
