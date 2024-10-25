import { Plan, SavedPlan } from "../types/entities";

import { parseDateEx } from "./parseDateEx";

export const savedPlan2Plan = (plan: SavedPlan): Plan => ({
  ...plan,
  transactions: plan.transactions.map((transaction) => ({
    ...transaction,
    trueDate: transaction.trueDate
      ? new Date(transaction.trueDate)
      : parseDateEx(transaction.date),
  })),
});
