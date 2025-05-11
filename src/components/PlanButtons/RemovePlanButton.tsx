import React, { FC } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons"; // Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePlanSelectorContext } from "../../context/PlanSelectorContext";
import { removePlan } from "../../slices/plansSlice";
import { useAppDispatch } from "../../store";

export const RemovePlanButton: FC = () => {
  const dispatch = useAppDispatch();
  const { onSelectPlan, selectedPlanId, disableableButtonClass } =
    usePlanSelectorContext();

  const handleRemovePlan = (): void => {
    // eslint-disable-next-line no-restricted-globals
    if (selectedPlanId && confirm("Are you sure to delete plan?")) {
      dispatch(removePlan(selectedPlanId));
      onSelectPlan("");
    }
  };

  return (
    <button
      className={`bg-red-500 ${disableableButtonClass}`}
      onClick={handleRemovePlan}
      disabled={!selectedPlanId}
      title="Remove"
    >
      <div className="sm:hidden">Remove</div>
      <FontAwesomeIcon icon={faClose} className="hidden sm:block" />
    </button>
  );
};
