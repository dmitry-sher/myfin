import React, { FC, useState } from "react";
import { faClose, faEdit, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

import { addCategory } from "../slices/categoriesSlice";
import { openModal, setTransactionForRepeat } from "../slices/modalSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { Category, Transaction } from "../types/entities";
import { ModalCode, newCategoryKey } from "../utils/const";
import { printDate } from "../utils/printDate";

import { TransactionCategory } from "./TransactionCategory";
import { TransactionEditForm } from "./TransactionEditForm";

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
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.categories);

  const handleSave = (updatedTransaction: Transaction): void => {
    onUpdateTransaction(updatedTransaction);
    setIsEditing(false);
  };

  const handleIsDonePress = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedTransaction = {
      ...transaction,
      isDone: e.target.checked,
    };
    onUpdateTransaction(updatedTransaction);
  };

  const { isDone } = transaction;
  const cbxProps: Record<string, unknown> = {
    className: "print:hidden",
  };
  cbxProps.checked = isDone;

  const handleEdit = (): void => setIsEditing(true);
  const handleDelete = (): void => {
    const message = `Are you sure to delete transaction from ${transaction.date} for ${transaction.amount} (${transaction.description})?`;
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(message)) {
      return;
    }
    onDeleteTransaction(transaction.id);
  };
  const handleRepeat = (): void => {
    dispatch(setTransactionForRepeat(transaction));
    dispatch(openModal(ModalCode.repeatItem));
  };
  const handleCancel = (): void => setIsEditing(false);

  const handleCategoryChange = (newCategory: {
    value: string;
    label: string;
  }): void => {
    if (newCategory.value === newCategoryKey) {
      const newCategoryObj: Category = {
        id: uuidv4(),
        name: newCategory.label,
      };
      dispatch(addCategory(newCategoryObj));
      newCategory.value = newCategoryObj.id;
    }

    onUpdateTransaction({
      ...transaction,
      categoryId: newCategory.value,
    });
  };

  return (
    <li className="flex justify-between items-center p-2 border-b flex-col sm:flex-row">
      {isEditing ? (
        <TransactionEditForm
          transaction={transaction}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div className="flex sm:w-3/5 w-full">
            <span className="mr-2">
              <input
                type="checkbox"
                onChange={handleIsDonePress}
                {...cbxProps}
              ></input>
            </span>
            <span
              className={`hidden print:inline-block h-5 ${
                isDone ? "mr-1" : "mr-6"
              }`}
            >
              {isDone ? "✔️" : ""}
            </span>
            <span className="w-1/5">{printDate(transaction)}</span>
            <span className="w-48">{transaction.description}</span>
          </div>
          <div className="flex sm:w-2/5 w-full justify-between">
            <span
              className={`w-1/4 sm:text-right ${
                transaction.amount > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {transaction.amount > 0 ? "+" : ""}
              {transaction.amount}
            </span>
            <span
              className={`w-1/4 sm:text-right ${
                balance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {balance}
            </span>
            <TransactionCategory
              categoryId={transaction.categoryId}
              categories={categories}
              onChange={handleCategoryChange}
            />
            <div className="flex items-center space-x-2 print:hidden">
              <button
                onClick={handleEdit}
                className="p-1 bg-blue-500 text-white rounded"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={handleRepeat}
                className="p-1 bg-green-500 text-white rounded"
              >
                <FontAwesomeIcon icon={faRepeat} />
              </button>
              <button
                onClick={handleDelete}
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
