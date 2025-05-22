import React, { FC } from "react";
import {
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { updateTransaction } from "../../slices/plansSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { printDate } from "../../utils/printDate";
import { processMouseClickForDate } from "../../utils/processMouseClickForDate";

import { TransactionFieldViewerProps } from "./types";

const helperTitle =
  "Simple click: one day; with Cmd key one week; with Shift key one month";

export const TransactionViewDate: FC<TransactionFieldViewerProps> = ({
  transaction,
  onClick,
  viewRef,
}) => {
  const dispatch = useAppDispatch();
  const selectedPlan = useAppSelector((state) => state.appState.selectedPlan);

  const handleForwardClick = (e: React.MouseEvent): void => {
    const updatedTransaction = {
      ...transaction,
    };
    updatedTransaction.trueDate.setHours(12, 0, 0, 0);
    updatedTransaction.trueDate = processMouseClickForDate(e, updatedTransaction.trueDate, 1);
    updatedTransaction.date = printDate(updatedTransaction);
    dispatch(
      updateTransaction({
        planId: selectedPlan?.id ?? "",
        updatedTransaction,
      })
    );
  };

  const handleBackwardClick = (e: React.MouseEvent): void => {
    const updatedTransaction = {
      ...transaction,
    };
    updatedTransaction.trueDate.setHours(12, 0, 0, 0);
    updatedTransaction.trueDate = processMouseClickForDate(e, updatedTransaction.trueDate, -1);
    updatedTransaction.date = printDate(updatedTransaction);

    dispatch(
      updateTransaction({
        planId: selectedPlan?.id ?? "",
        updatedTransaction,
      })
    );
  };

  return (
    <>
      <span
        className="cursor-pointer print:hidden"
        onClick={handleBackwardClick}
        title={helperTitle}
      >
        <FontAwesomeIcon icon={faBackwardStep} className="mr-2 primary" />
      </span>
      <span className="w-1/12 print:w-1/5 cursor-text" onClick={onClick} ref={viewRef}>
        {printDate(transaction)}
      </span>
      <span
        className="border-r-2 mr-2 cursor-pointer print:hidden"
        onClick={handleForwardClick}
        title={helperTitle}
      >
        <FontAwesomeIcon icon={faForwardStep} className="mr-2" />
      </span>
    </>
  );
};
