import React, { FC } from "react";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePlanSelectorContext } from "../../context/PlanSelectorContext";

export const PrintPlanButton: FC = () => {
  const { selectedPlan, disableableButtonClass } = usePlanSelectorContext();
  const triggerPrintDialog = (): void => {
    window.print();
  };

  return (
    <button
      className={`bg-gray-500 hidden sm:inline-block ${disableableButtonClass}`}
      onClick={triggerPrintDialog}
      disabled={!selectedPlan?.id}
      title="Print"
    >
      <div className="sm:hidden">Print</div>
      <FontAwesomeIcon icon={faPrint} className="hidden sm:block" />
    </button>
  );
};
