import React, { FC } from "react";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePlanSelectorContext } from "../../context/PlanSelectorContext";
import { exportPlan } from "../../slices/plansSlice";
import { useAppDispatch } from "../../store";

export const ExportPlanButton: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPlanId, disableableButtonClass } =
    usePlanSelectorContext();

  const handleExport = (): void => {
    if (!selectedPlanId) return;

    dispatch(exportPlan(selectedPlanId));
  };

  return (
    <button
      className={`bg-gray-500 hidden sm:inline-block ${disableableButtonClass}`}
      onClick={handleExport}
      disabled={!selectedPlanId}
      title="Export"
    >
      <div className="sm:hidden">Export</div>
      <FontAwesomeIcon icon={faDownload} className="hidden sm:block" />
    </button>
  );
};
