import { Transaction } from "../types/entities";

import { parseDate } from "./parseDate";

export const sortTransactions = (transactions: Transaction[]) =>
  [...transactions].sort((a, b) => {
    return parseDate(a.date).getTime() - parseDate(b.date).getTime();
  });
