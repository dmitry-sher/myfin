import { Plan } from "../types/entities";

import { parseDateEx } from "./parseDateEx";
import { saveStore } from "./saveStore";

export const loadAndPrepareTransactions = (): Plan[] => {
  try {
    const plans: Plan[] = JSON.parse(localStorage.getItem("plans") || "[]");
    for (const plan of plans) {
      for (const transaction of plan.transactions) {
        if (!transaction.trueDate)
          transaction.trueDate = parseDateEx(transaction.date);
        else transaction.trueDate = new Date(transaction.trueDate);
      }
    }
    saveStore(plans);
    console.error("[loadAndPrepareTransactions] plans = ", plans);
    return plans;
  }
  catch (e) {
    console.error("[loadAndPrepareTransactions] error!", e);
    return [];
  }
};
