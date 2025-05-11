import React, { FC } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { openModal, setTotalsTransactions } from "../../slices/modalSlice";
import { useAppDispatch } from "../../store";
import { Transaction } from "../../types/entities";
import { ModalCode } from "../../utils/const";

interface ViewTotalsButtonProps {
  monthTransactions: Transaction[];
}

export const ViewTotalsButton: FC<ViewTotalsButtonProps> = ({
  monthTransactions,
}) => {
  const dispatch = useAppDispatch();
  const handleShowTotals = (): void => {
    dispatch(setTotalsTransactions(monthTransactions));
    dispatch(openModal(ModalCode.monthTotals));
  };

  return (
    <span className="hidden sm:block sm:w-1/2 w-1/5">
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
