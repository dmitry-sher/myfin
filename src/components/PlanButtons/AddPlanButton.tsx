import React, { FC } from "react";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

import { usePlanSelectorContext } from "../../context/PlanSelectorContext";
import { addPlan } from "../../slices/plansSlice";
import { useAppDispatch } from "../../store";

export const AddPlanButton: FC = () => {
  const dispatch = useAppDispatch();
  const { onSelectPlan } = usePlanSelectorContext();

  const handleCreatePlan = (): void => {
    const newPlanId = uuidv4();
    const newPlanName = newPlanId.substring(0, 6);
    dispatch(
      addPlan({
        newPlanName,
        newPlanId,
      })
    );
    setTimeout(() => onSelectPlan(newPlanId), 50);
  };

  return (
    <button
      className={"bg-green-500 text-white py-2 px-4 rounded mr-2 mb-2 sm:mb-0"}
      onClick={handleCreatePlan}
      title="Add plan"
    >
      <div className="sm:hidden">New</div>
      <FontAwesomeIcon icon={faFolderPlus} className="hidden sm:block" />
    </button>
  );
};
