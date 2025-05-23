import React, { FC } from "react";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePlanSelectorContext } from "../../../context/PlanSelectorContext";
import { exportPlan } from "../../../slices/plansSlice";
import { useAppDispatch } from "../../../store";

export const ExportPlanButton: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPlan, disableableButtonClass } =
    usePlanSelectorContext();

  const handleExport = (): void => {
    if (!selectedPlan) return;

    dispatch(exportPlan(selectedPlan.id));
  };

  return (
    <button
      className={`bg-gray-500 hidden sm:inline-block ${disableableButtonClass}`}
      onClick={handleExport}
      disabled={!selectedPlan?.id}
      title="Export"
    >
      <div className="sm:hidden">Export</div>
      <FontAwesomeIcon icon={faDownload} className="hidden sm:block" />
    </button>
  );
};
