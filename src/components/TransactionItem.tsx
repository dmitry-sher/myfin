import React, { FC, useState } from "react";

import { Transaction } from "../types/entities";

import { TransactionEditForm } from "./TransactionEditForm";
import { ViewTransaction } from "./ViewTransaction";

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

  const handleCancel = (): void => setIsEditing(false);

  return (
    <li className="flex justify-between items-center p-2 border-b flex-col sm:flex-row">
      {isEditing ? (
        <TransactionEditForm
          transaction={transaction}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <ViewTransaction
          transaction={transaction}
          onUpdateTransaction={onUpdateTransaction}
          onDeleteTransaction={onDeleteTransaction}
          setIsEditing={setIsEditing}
          balance={balance}
        />
      )}
    </li>
  );
};
