import { Plan, SavedPlan } from "../types/entities";

import { savedPlan2Plan } from "./savedPlanToPlan";
import { saveStore } from "./saveStore";

export const loadAndPrepareTransactions = (): Plan[] => {
  try {
    const savedPlans: SavedPlan[] = JSON.parse(
      localStorage.getItem("plans") || "[]"
    );
    const plans = savedPlans.map(savedPlan2Plan);
    saveStore(plans);
    return plans;
  }
  catch (e) {
    console.error("[loadAndPrepareTransactions] error!", e);
    return [];
  }
};
