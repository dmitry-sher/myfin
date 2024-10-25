import { Transaction } from "../types/entities";

export const sortTransactions = (transactions: Transaction[]): Transaction[] =>
  [...transactions].sort((a, b) => {
    return a.trueDate.getTime() - b.trueDate.getTime();
  });
