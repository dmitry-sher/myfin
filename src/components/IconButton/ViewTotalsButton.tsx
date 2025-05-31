import React, { FC } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { useMonthTotalsContext } from "../../context/MonthTotalsContext";
import { openModal, setTotalsData } from "../../slices/modalSlice";
import { useAppDispatch } from "../../store";
import { IconButtonProps } from "../../types/uiTypes";
import { ModalCode } from "../../utils/const";

import { GeneralIconButton } from "./GeneralIconButton";

export const ViewTotalsButton: FC<IconButtonProps> = ({ size }) => {
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
    <GeneralIconButton
      onClick={handleShowTotals}
      title="totals"
      icon={faEye}
      size={size}
    />
  );
};
