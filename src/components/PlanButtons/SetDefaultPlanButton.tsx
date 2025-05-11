import { FC } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePlanSelectorContext } from "../../context/PlanSelectorContext";
import { setDefaultPlan } from "../../slices/plansSlice";
import { useAppDispatch } from "../../store";

export const SetDefaultPlanButton: FC = () => {
  const { selectedPlanId, selectedPlan, disableableButtonClass } =
    usePlanSelectorContext();
  const dispatch = useAppDispatch();

  const isDefault = selectedPlan?.isDefault ?? false;

  const handleClick = (): void => {
    if (selectedPlanId && !isDefault) {
      dispatch(setDefaultPlan({ planId: selectedPlanId }));
    }

    // eslint-disable-next-line no-restricted-globals
    if (
      selectedPlanId &&
      isDefault &&
      confirm("Are you sure to remove default plan?")
    ) {
      dispatch(setDefaultPlan({ planId: "" }));
    }
  };

  const buttonClass = isDefault
    ? "bg-indigo-600 cursor-default"
    : "bg-gray-400 hover:bg-gray-500";

  return (
    <button
      className={`${buttonClass} ${disableableButtonClass}`}
      onClick={handleClick}
      disabled={!selectedPlanId}
      title={isDefault ? "Default plan" : "Set as default"}
    >
      <div className="sm:hidden">{isDefault ? "Default" : "Make Default"}</div>
      <FontAwesomeIcon
        icon={faCheck}
        className={`hidden sm:block ${isDefault ? "" : "opacity-50"}`}
      />
    </button>
  );
};
