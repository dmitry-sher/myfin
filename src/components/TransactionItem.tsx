import React, { FC, useState } from "react";
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons"; // Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Transaction } from "../types/entities";
import { printDate } from "../utils/printDate";

import TransactionEditForm from "./TransactionEditForm";

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

  const handleSave = (updatedTransaction: Transaction): void => {
    onUpdateTransaction(updatedTransaction);
    setIsEditing(false);
  };

  const { isDone } = transaction;
  const cbxProps: Record<string, unknown> = {};
  if (isDone) cbxProps.checked = true;

  return (
    <li className="flex justify-between items-center p-2 border-b flex-col sm:flex-row">
      {isEditing ? (
        <TransactionEditForm
          transaction={transaction}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="flex sm:w-3/5 w-full">
            <span className="mr-2">
              <input type="checkbox" {...cbxProps}></input>
            </span>
            <span className="w-1/5">{printDate(transaction)}</span>
            <span className="w-48">{transaction.description}</span>
          </div>
          <div className="flex sm:w-2/5 w-full justify-between">
            <span
              className={`w-1/3 sm:text-right ${
                transaction.amount > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {transaction.amount > 0 ? "+" : ""}
              {transaction.amount}
            </span>
            <span
              className={`w-1/3 sm:text-right ${
                balance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {balance}
            </span>
            <div className="flex items-center space-x-2 text-right">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 bg-blue-500 text-white rounded"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={() => {
                  const message = `Are you sure to delete transaction from ${transaction.date} for ${transaction.amount} (${transaction.description})?`;
                  // eslint-disable-next-line no-restricted-globals
                  if (!confirm(message)) {
                    return;
                  }
                  onDeleteTransaction(transaction.id);
                }}
                className="p-1 bg-red-500 text-white rounded"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default TransactionItem;
