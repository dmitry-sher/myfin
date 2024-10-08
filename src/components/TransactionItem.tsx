import React, { useState, FC } from "react";
import TransactionEditForm from "./TransactionEditForm";
import { Transaction } from "../types/entities";

interface TransactionItemProps {
  transaction: Transaction;
  balance: number;
  onUpdateTransaction: (updatedTransaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
}

export const TransactionItem: FC<TransactionItemProps> = ({
  transaction,
  balance,
  onUpdateTransaction,
  onDeleteTransaction,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedTransaction: Transaction) => {
    onUpdateTransaction(updatedTransaction);
    setIsEditing(false);
  };

  return (
    <li className="flex justify-between items-center p-2 border-b">
      {isEditing ? (
        <TransactionEditForm
          transaction={transaction}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <span className="w-1/5">{transaction.date}</span>
          <span className="w-48">{transaction.description}</span>
          <span
            className={`w-1/5 text-right ${
              transaction.amount > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {transaction.amount > 0 ? "+" : ""}
            {transaction.amount}
          </span>
          <span
            className={`w-1/5 text-right ${
              balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {balance}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteTransaction(transaction.id)}
              className="p-1 bg-red-500 text-white rounded"
            >
              Х
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TransactionItem;
