import React, { FC } from "react";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

import { usePlanSelectorContext } from "../../context/PlanSelectorContext";
import { copyPlan } from "../../slices/plansSlice";
import { useAppDispatch } from "../../store";

export const DuplicatePlanButton: FC = () => {
  const dispatch = useAppDispatch();
  const { onSelectPlan, selectedPlan, disableableButtonClass } =
    usePlanSelectorContext();

  const handleDuplicatePlan = (): void => {
    const newPlanId = uuidv4();
    if (selectedPlan) {
      const newPlanName = `${selectedPlan.name} copy`;
      const action = {
        planId: selectedPlan.id,
        newPlanId,
        newPlanName,
      };
      dispatch(copyPlan(action));

      setTimeout(() => {
        onSelectPlan(newPlanId);
      }, 250);
    }
  };

  return (
    <button
      className={`bg-blue-500 ${disableableButtonClass}`}
      onClick={handleDuplicatePlan}
      disabled={!selectedPlan?.id}
      title="Duplicate"
    >
      <div className="sm:hidden">Copy</div>
      <FontAwesomeIcon icon={faCopy} className="hidden sm:block" />
    </button>
  );
};
