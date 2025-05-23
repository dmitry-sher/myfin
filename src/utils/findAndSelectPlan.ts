import { store } from "../store";

export const findAndSelectPlan = (
  setSelectedPlanId: (arg: string | null) => void,
  planId: string
): void => {
  const { plans } = store.getState();
  if (!planId) {
    setSelectedPlanId(null);
    window.location.hash = "";
    return;
  }

  const selectedPlan = plans.find((plan) => plan.id === planId);
  if (selectedPlan) {
    setSelectedPlanId(planId);
    window.location.hash = planId;
    return;
  }

  // eslint-disable-next-line no-console
  console.log(
    "[findAndSelectPlan] Plan not found:",
    JSON.stringify({ planId })
  );
};
