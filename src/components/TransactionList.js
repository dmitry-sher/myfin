// src/components/TransactionList.js
import React from "react";
import TransactionItem from "./TransactionItem";

function TransactionList({
  transactions,
  onUpdateTransaction,
  onDeleteTransaction,
}) {
  // Function to parse date strings (dd/mm) into a comparable Date object
  const parseDate = (dateStr) => {
    const [day, month] = dateStr.split("/").map(Number);
    return new Date(new Date().getFullYear(), month - 1, day);
  };

  // Sort transactions by date (oldest first)
  const sortedTransactions = [...transactions].sort((a, b) => {
    return parseDate(a.date) - parseDate(b.date);
  });

  // Calculate running balance
  let runningBalance = 0;

  return (
    <div>
      {/* Headers */}
      <div className="flex justify-between font-semibold p-2 border-b">
        <span className="w-1/5">Date</span>
        <span className="w-1/5">Description</span>
        <span className="w-1/5 text-right">Amount</span>
        <span className="w-1/5 text-right">Balance</span>
        <span className="w-1/5 text-right">Actions</span>
      </div>
      <ul className="space-y-2">
        {sortedTransactions.map((transaction, index) => {
          // Update running balance
          runningBalance += transaction.amount;

          // Return TransactionItem with the current running balance
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
