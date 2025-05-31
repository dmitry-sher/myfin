import React, { FC } from "react";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useMonthTotalsContext } from "../../context/MonthTotalsContext";
import { openModal, setTotalsData } from "../../slices/modalSlice";
import { useAppDispatch } from "../../store";
import { IconButtonProps } from "../../types/uiTypes";
import { ModalCode } from "../../utils/const";

export const ViewTotalChartButton: FC<IconButtonProps> = ({ size }) => {
  const dispatch = useAppDispatch();
  const { monthTransactions, monthKey, startingBalance } =
    useMonthTotalsContext();
  const handleShowGraphs = (): void => {
    dispatch(
      setTotalsData({
        monthKey,
        totalsTransactions: monthTransactions,
        totalsStartingBalance: startingBalance ?? 0,
      })
    );
    dispatch(openModal(ModalCode.totalGraphs));
  };

  return (
    <span className="hidden sm:block">
      <button
        className={"text-black py-2 rounded mr-2 mb-2 sm:mb-0"}
        onClick={handleShowGraphs}
        title="month graph"
      >
        <div className="sm:hidden">month graph</div>
        <FontAwesomeIcon
          icon={faChartSimple}
          className="hidden sm:block"
          size={size}
        />
      </button>
    </span>
  );
};
