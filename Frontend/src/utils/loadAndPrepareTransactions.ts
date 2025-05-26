import { Plan, SavedPlan } from "../types/entities";

import { plansStorageKey } from "./const";
import { savedPlan2Plan } from "./savedPlanToPlan";

export const loadAndPrepareTransactions = (): Plan[] => {
  try {
    const savedPlans: SavedPlan[] = JSON.parse(
      localStorage.getItem(plansStorageKey) || "[]"
    );
    const plans = savedPlans.map(savedPlan2Plan);
    return plans;
  }
  catch (e) {
    console.error("[loadAndPrepareTransactions] error!", e);
    return [];
  }
};
