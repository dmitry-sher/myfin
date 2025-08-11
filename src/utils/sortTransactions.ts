import { Transaction } from "../types/entities";

export const sortTransactions = (transactions: Transaction[]): Transaction[] =>
  [...transactions].sort((a, b) => {
    const ret = a.trueDate.getTime() - b.trueDate.getTime();
    if (ret === 0) {
      return b.amount - a.amount;
    }
    return ret;
  });
