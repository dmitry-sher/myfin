import React, { FC } from "react";
import { faPieChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useMonthTotalsContext } from "../../context/MonthTotalsContext";
import { openModal, setTotalsData } from "../../slices/modalSlice";
import { useAppDispatch } from "../../store";
import { ModalCode } from "../../utils/const";

export const ViewPieChartButton: FC = ({}) => {
  const dispatch = useAppDispatch();
  const { monthTransactions, monthKey, startingBalance } =
    useMonthTotalsContext();
  const handleShowPieChart = (): void => {
    dispatch(
      setTotalsData({
        monthKey,
        totalsTransactions: monthTransactions,
        totalsStartingBalance: startingBalance ?? 0,
      })
    );
    dispatch(openModal(ModalCode.pieChart));
  };

  return (
    <span className="hidden sm:block">
      <button
        className={"text-black py-2 rounded mr-2 mb-2 sm:mb-0"}
        onClick={handleShowPieChart}
        title="pie charts"
      >
        <div className="sm:hidden">pie charts</div>
        <FontAwesomeIcon icon={faPieChart} className="hidden sm:block" />
      </button>
    </span>
  );
};
