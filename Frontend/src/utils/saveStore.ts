import { RootState } from "../store";

import { categoriesStorageKey, plansStorageKey } from "./const";
import { plan2SavedPlan } from "./planToSavedPlan";

export const saveStore = (state: RootState): void => {
  const preparedPlans = state.plans.map(plan2SavedPlan);
  try {
    const plans = JSON.stringify(preparedPlans);
    localStorage.setItem(plansStorageKey, plans);
    const categories = JSON.stringify(state.categories);
    localStorage.setItem(categoriesStorageKey, categories);
  }
  catch (err) {
    console.error("Could not save state", err);
  }
};
