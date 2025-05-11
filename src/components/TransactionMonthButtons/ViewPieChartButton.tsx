import React, { FC } from "react";
import { faPieChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { openModal } from "../../slices/modalSlice";
import { useAppDispatch } from "../../store";
import { Transaction } from "../../types/entities";
import { ModalCode } from "../../utils/const";

interface ViewPieChartButtonProps {
  monthTransactions: Transaction[];
}

export const ViewPieChartButton: FC<ViewPieChartButtonProps> = ({
  monthTransactions,
}) => {
  const dispatch = useAppDispatch();
  const handleShowPieChart = (): void => {
    dispatch(openModal(ModalCode.pieChart));

    // eslint-disable-next-line no-console
    console.log("monthTransactions", monthTransactions);
  };

  return (
    <span className="hidden sm:block">
      <button
        className={"text-black py-2 rounded mr-2 mb-2 sm:mb-0 opacity-50"}
        onClick={handleShowPieChart}
        title="totals"
        disabled
      >
        <div className="sm:hidden">totals</div>
        <FontAwesomeIcon icon={faPieChart} className="hidden sm:block" />
      </button>
    </span>
  );
};
