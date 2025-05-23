import React, { FC } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useMonthTotalsContext } from "../../context/MonthTotalsContext";
import { openModal, setTotalsData } from "../../slices/modalSlice";
import { useAppDispatch } from "../../store";
import { ModalCode } from "../../utils/const";

export const ViewTotalsButton: FC = () => {
  const { monthTransactions, monthKey, startingBalance } =
    useMonthTotalsContext();
  const dispatch = useAppDispatch();
  const handleShowTotals = (): void => {
    dispatch(
      setTotalsData({
        monthKey,
        totalsTransactions: monthTransactions,
        totalsStartingBalance: startingBalance ?? 0,
      })
    );
    dispatch(openModal(ModalCode.monthTotals));
  };

  return (
    <span className="hidden sm:block">
      <button
        className={"text-black py-2 rounded mr-2 mb-2 sm:mb-0"}
        onClick={handleShowTotals}
        title="totals"
      >
        <div className="sm:hidden">totals</div>
        <FontAwesomeIcon icon={faEye} className="hidden sm:block" />
      </button>
    </span>
  );
};
