import React, { ChangeEvent, FC } from "react";
import { v4 as uuidv4 } from "uuid";

import { addCategory } from "../slices/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { Category, Transaction } from "../types/entities";
import { newCategoryKey } from "../utils/const";
import { printDate } from "../utils/printDate";

import { DeleteTransactionButton } from "./TransactionButtons/DeleteTransactionButton";
import { EditTransactionButton } from "./TransactionButtons/EditTransactionButton";
import { RepeatTransactionButton } from "./TransactionButtons/RepeatTransactionButton";
import { TransactionCategory } from "./TransactionCategory";

interface ViewTransactionProps {
  transaction: Transaction;
  balance: number;
  onUpdateTransaction: (updatedTransaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
  setIsEditing: (arg: boolean) => void;
}

export const ViewTransaction: FC<ViewTransactionProps> = ({
  transaction,
  balance,
  onUpdateTransaction,
  onDeleteTransaction,
  setIsEditing
}) => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.categories);

  const { isDone } = transaction;
  const cbxProps: Record<string, unknown> = {
    className: "print:hidden",
  };
  cbxProps.checked = isDone;

  const handleIsDonePress = (e: ChangeEvent<HTMLInputElement>): void => {
    const updatedTransaction = {
      ...transaction,
      isDone: e.target.checked,
    };
    onUpdateTransaction(updatedTransaction);
  };

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
        <span className="w-4/5">{transaction.description}</span>
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
          <EditTransactionButton setIsEditing={setIsEditing} />
          <RepeatTransactionButton transaction={transaction} />
          <DeleteTransactionButton
            transaction={transaction}
            onDeleteTransaction={onDeleteTransaction}
          />
        </div>
      </div>
    </>
  );
};
