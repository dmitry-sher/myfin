import { addMonths, addWeeks, format } from "date-fns";

import { addTransaction } from "../slices/plansSlice";
import { useAppDispatch } from "../store";
import { Transaction } from "../types/entities";

import { RepeatType } from "./const";

export type RepeatTransactionFunctionProps = {
  planId: string;
  transaction: Transaction;
  period: RepeatType;
  repeats: number;
  dispatch: ReturnType<typeof useAppDispatch>;
};

export const addPeriodToTransaction = (
  transaction: Transaction,
  period: RepeatType
): Transaction => {
  const newTransaction = {
    ...transaction,
  };

  if (period === RepeatType.monthly) {
    newTransaction.trueDate = addMonths(transaction.trueDate, 1);
  }
  if (period === RepeatType.weekly) {
    newTransaction.trueDate = addWeeks(transaction.trueDate, 1);
  }

  newTransaction.date = format(newTransaction.trueDate, "dd/MM");
  return newTransaction;
};

export const repeatTransaction = ({
  planId,
  transaction,
  period,
  repeats,
  dispatch,
}: RepeatTransactionFunctionProps): void => {
  let newTransaction = addPeriodToTransaction(transaction, period);
  dispatch(
    addTransaction({
      planId,
      transaction: newTransaction,
    })
  );
  for (let i = 1; i < repeats; i++) {
    newTransaction = addPeriodToTransaction(newTransaction, period);
    dispatch(
      addTransaction({
        planId,
        transaction: newTransaction,
      })
    );
  }
};
