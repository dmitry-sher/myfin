import { RootState } from "../store";

import { plan2SavedPlan } from "./planToSavedPlan";

export const saveStore = (state: RootState["plans"]): void => {
  const preparedPlans = state.map(plan2SavedPlan);
  try {
    const serializedState = JSON.stringify(preparedPlans);
    localStorage.setItem("plans", serializedState);
  }
  catch (err) {
    console.error("Could not save state", err);
  }
};
