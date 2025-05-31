import React, { FC } from "react";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";

import { useMonthTotalsContext } from "../../context/MonthTotalsContext";
import { openModal, setTotalsData } from "../../slices/modalSlice";
import { useAppDispatch } from "../../store";
import { IconButtonProps } from "../../types/uiTypes";
import { ModalCode } from "../../utils/const";

import { GeneralIconButton } from "./GeneralIconButton";

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
    <GeneralIconButton
      onClick={handleShowGraphs}
      title="month graph"
      icon={faChartSimple}
      size={size}
    />
  );
};
