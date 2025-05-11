import React, { FC } from "react";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePlanSelectorContext } from "../../context/PlanSelectorContext";

export const PrintPlanButton: FC = () => {
  const { selectedPlanId, disableableButtonClass } = usePlanSelectorContext();
  const triggerPrintDialog = (): void => {
    window.print();
  };

  return (
    <button
      className={`bg-gray-500 ${disableableButtonClass}`}
      onClick={triggerPrintDialog}
      disabled={!selectedPlanId}
      title="Print"
    >
      <div className="sm:hidden">Print</div>
      <FontAwesomeIcon icon={faPrint} className="hidden sm:block" />
    </button>
  );
};
