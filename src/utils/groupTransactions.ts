import { format } from "date-fns";

import { Transaction } from "../types/entities";

import { parseDate } from "./parseDate";

export const groupTransactions = (
  transactions: Transaction[]
): Record<string, Transaction[]> =>
  transactions.reduce((acc, transaction) => {
    const date = parseDate(transaction.date);

    const monthKey = format(date, "MMM-yyyy");
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(transaction);
    return acc;
  }, {} as { [key: string]: Transaction[] });
