import { format } from "date-fns";

import { Transaction } from "../types/entities";

export const printDate = (transaction: Transaction): string => {
  if (transaction.trueDate) return format(transaction.trueDate, "dd.MM.yy");
  return transaction.date;
};
