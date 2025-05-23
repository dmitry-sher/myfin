import { createContext, useContext } from "react";

import { Plan } from "../types/entities";

export interface PlanSelectorContextType {
  plans: Plan[];
  selectedPlanId: string | null;
  selectedPlan: Plan | null | undefined;
  onSelectPlan: (planId: string) => void;
  disableableButtonClass: string;
}

export const PlanSelectorContext = createContext<
  PlanSelectorContextType | undefined
>(undefined);

export const usePlanSelectorContext = (): PlanSelectorContextType => {
  const context = useContext(PlanSelectorContext);
  if (!context) throw new Error("PlanSelectorContext not found");
  return context;
};
