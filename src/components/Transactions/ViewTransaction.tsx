import React, { ChangeEvent, FC, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { useAppContext } from "../../context/AppContext";
import { addCategory } from "../../slices/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { Category, Transaction } from "../../types/entities";
import { newCategoryKey } from "../../utils/const";
import { printDate } from "../../utils/printDate";
import { DeleteTransactionButton } from "../TransactionButtons/DeleteTransactionButton";
import { RepeatTransactionButton } from "../TransactionButtons/RepeatTransactionButton";

import { TransactionCategory } from "./TransactionCategory";
import { TransactionField } from "./TransactionField";
import { TransactionViewAmount } from "./TransactionViewAmount";
import { TransactionViewDate } from "./TransactionViewDate";
import { TransactionViewDescription } from "./TransactionViewDescription";

interface ViewTransactionProps {
  transaction: Transaction;
  balance: number;
  onUpdateTransaction: (updatedTransaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
}

export const ViewTransaction: FC<ViewTransactionProps> = ({
  transaction,
  balance,
  onUpdateTransaction,
  onDeleteTransaction,
}) => {
  const dispatch = useAppDispatch();
  const { setSelectedTransaction } = useAppContext();

  const categories = useAppSelector((state) => state.categories);
  const dateFieldRef = useRef<HTMLSpanElement>(null);
  const descriptionFieldRef = useRef<HTMLSpanElement>(null);
  const amountFieldRef = useRef<HTMLSpanElement>(null);

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

  const handleUpdateTransaction = (updatedTransaction: Transaction): void => {
    onUpdateTransaction(updatedTransaction);
  };

  const handleDateFieldTab = (): void => {
    setTimeout(() => {
      if (descriptionFieldRef.current) {
        descriptionFieldRef.current.click();
      }
    }, 50);
  };

  const handleDescriptionFieldTab = (): void => {
    setTimeout(() => {
      if (amountFieldRef.current) {
        amountFieldRef.current.click();
      }
    }, 50);
  };

  const handleMouseEnter = (): void => {
    setSelectedTransaction(transaction);
  };

  const handleMouseLeave = (): void => {
    setSelectedTransaction(null);
  };

  return (
    <li
      className="flex justify-between items-center p-2 border-b flex-col sm:flex-row hover:bg-gray-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
        <TransactionField
          transaction={transaction}
          onChange={handleUpdateTransaction}
          viewer={TransactionViewDate}
          fieldName="date"
          className="w-1/12 mr-2"
          initialTransform={(): string => printDate(transaction)}
          viewRef={dateFieldRef}
          onTab={handleDateFieldTab}
        />
        <TransactionField
          transaction={transaction}
          onChange={handleUpdateTransaction}
          viewer={TransactionViewDescription}
          fieldName="description"
          className="w-4/5"
          viewRef={descriptionFieldRef}
          onTab={handleDescriptionFieldTab}
        />
      </div>
      <div className="flex sm:w-2/5 w-full justify-between items-center">
        <TransactionField
          transaction={transaction}
          onChange={handleUpdateTransaction}
          viewer={TransactionViewAmount}
          fieldName="amount"
          className="w-1/4 sm:text-right"
          transformer={(value: string): number => Number(value) ?? 0}
          initialTransform={(value: string): number => Number(value) ?? 0}
          viewRef={amountFieldRef}
        />
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
          <RepeatTransactionButton transaction={transaction} />
          <DeleteTransactionButton
            transaction={transaction}
            onDeleteTransaction={onDeleteTransaction}
          />
        </div>
      </div>
    </li>
  );
};
