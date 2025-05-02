import React, { FC } from "react";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

import { copyPlan } from "../../slices/plansSlice";
import { useAppDispatch } from "../../store";

import { usePlanSelectorContext } from "./PlanSelectorContext";

export const DuplicatePlanButton: FC = () => {
  const dispatch = useAppDispatch();
  const { onSelectPlan, plans, selectedPlanId, disableableButtonClass } =
    usePlanSelectorContext();

  const handleDuplicatePlan = (): void => {
    const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);
    if (selectedPlan) {
      const newPlanName = `${selectedPlan.name} copy`;
      const action = {
        planId: selectedPlanId || "",
        newPlanName,
        newPlanId: uuidv4(),
      };
      dispatch(copyPlan(action));

      onSelectPlan(action.newPlanId);
    }
  };

  return (
    <button
      className={`bg-blue-500 ${disableableButtonClass}`}
      onClick={handleDuplicatePlan}
      disabled={!selectedPlanId}
      title="Duplicate"
    >
      <div className="sm:hidden">Copy</div>
      <FontAwesomeIcon icon={faCopy} className="hidden sm:block" />
    </button>
  );
};
