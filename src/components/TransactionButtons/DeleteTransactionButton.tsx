import React, { FC } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Transaction } from "../../types/entities";

interface DeleteTransactionButtonProps {
  transaction: Transaction;
  onDeleteTransaction: (id: string) => void;
}

export const DeleteTransactionButton: FC<DeleteTransactionButtonProps> = ({
  transaction,
  onDeleteTransaction,
}) => {
  const handleDelete = (): void => {
    const message = `Are you sure to delete transaction from ${transaction.date} for ${transaction.amount} (${transaction.description})?`;
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(message)) {
      return;
    }
    onDeleteTransaction(transaction.id);
  };

  return (
    <button
      onClick={handleDelete}
      className="p-1 bg-red-500 text-white rounded"
    >
      <FontAwesomeIcon icon={faClose} />
    </button>
  );
};
