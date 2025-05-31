import React, { FC } from "react";
import { faPieChart } from "@fortawesome/free-solid-svg-icons";

import { useMonthTotalsContext } from "../../context/MonthTotalsContext";
import { openModal, setTotalsData } from "../../slices/modalSlice";
import { useAppDispatch } from "../../store";
import { IconButtonProps } from "../../types/uiTypes";
import { ModalCode } from "../../utils/const";

import { GeneralIconButton } from "./GeneralIconButton";

export const ViewPieChartButton: FC<IconButtonProps> = ({ size }) => {
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
    <GeneralIconButton
      onClick={handleShowPieChart}
      title="pie charts"
      icon={faPieChart}
      size={size}
    />
  );
};
