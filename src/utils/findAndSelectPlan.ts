import { setSelectedPlan } from "../slices/appStateSlice";
import { store, useAppDispatch } from "../store";

export const findAndSelectPlan = (
  dispatch: ReturnType<typeof useAppDispatch>,
  planId: string
): void => {
  const { plans } = store.getState();
  if (!planId) {
    dispatch(setSelectedPlan(null));
    window.location.hash = "";
    return;
  }

  const selectedPlan = plans.find((plan) => plan.id === planId);
  if (selectedPlan) {
    dispatch(setSelectedPlan(selectedPlan));
    window.location.hash = planId;
    return;
  }

  // eslint-disable-next-line no-console
  console.log(
    "[findAndSelectPlan] Plan not found:",
    JSON.stringify({ planId })
  );
};
