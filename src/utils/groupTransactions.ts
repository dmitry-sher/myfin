import { format } from "date-fns";

import { Transaction } from "../types/entities";

import { monthKeyFormat } from "./const";

export const groupTransactions = (
  transactions: Transaction[]
): Record<string, Transaction[]> =>
  transactions.reduce((acc, transaction) => {
    const date = transaction.trueDate;

    const monthKey = format(date, monthKeyFormat);
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(transaction);
    return acc;
  }, {} as { [key: string]: Transaction[] });
