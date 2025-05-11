import React, { FC } from "react";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { openModal } from "../../slices/modalSlice";
import { useAppDispatch } from "../../store";
import { Transaction } from "../../types/entities";
import { ModalCode } from "../../utils/const";

interface ViewMonthGraphsButtonProps {
  monthTransactions: Transaction[];
}

export const ViewMonthGraphsButton: FC<ViewMonthGraphsButtonProps> = ({
  monthTransactions,
}) => {
  const dispatch = useAppDispatch();
  const handleShowGraphs = (): void => {
    dispatch(openModal(ModalCode.monthGraphs));

    // eslint-disable-next-line no-console
    console.log("monthTransactions", monthTransactions);
  };

  return (
    <span className="hidden sm:block">
      <button
        className={"text-black py-2 rounded mr-2 mb-2 sm:mb-0 opacity-50"}
        onClick={handleShowGraphs}
        title="totals"
        disabled
      >
        <div className="sm:hidden">totals</div>
        <FontAwesomeIcon icon={faChartSimple} className="hidden sm:block" />
      </button>
    </span>
  );
};
