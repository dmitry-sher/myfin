import { RootState } from "../store";
import { SavedPlan } from "../types/entities";

export const saveStore = (state: RootState["plans"]): void => {
  const preparedPlans: SavedPlan[] = state.map((plan) => ({
    ...plan,
    transactions: plan.transactions.map((tr) => ({
      ...tr,
      trueDate: tr.trueDate.toISOString(),
    })),
  }));
  try {
    const serializedState = JSON.stringify(preparedPlans);
    localStorage.setItem("plans", serializedState);
  }
  catch (err) {
    console.error("Could not save state", err);
  }
};
