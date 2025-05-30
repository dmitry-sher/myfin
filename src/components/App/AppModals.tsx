import React, { FC } from "react";

import { useAppContext } from "../../context/AppContext";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { Transaction } from "../../types/entities";
import { ModalCode, RepeatType } from "../../utils/const";
import { repeatTransaction } from "../../utils/repeatTransaction";
import { MonthlyBarChart } from "../Analytics/MonthlyBarChart";
import { MonthPieCharts } from "../Analytics/MonthPieCharts";
import { MonthTotals } from "../Analytics/MonthTotals";
import { TotalBarChart } from "../Analytics/TotalBarChart";
import { RepeatItemForm } from "../Transactions/RepeatItemForm";
import { ModalComponent } from "../Util/ModalComponent";

import { CategoryList } from "./CategoryList";

export const AppModals: FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);
  const monthKey = useAppSelector(
    (state: RootState) => state.modal.totalsData.monthKey
  );
  const transactionToRepeat = useAppSelector(
    (state) => state.modal.repeatTransaction
  );
  const { selectedPlan } = useAppContext();

  const handleRepeat = (
    transaction: Transaction,
    period: RepeatType,
    repeats: number
  ): void => {
    repeatTransaction({
      dispatch,
      transaction,
      planId: selectedPlan?.id ?? "",
      period,
      repeats,
    });
  };

  return (
    <>
      <ModalComponent code={ModalCode.repeatItem} title="Repeat item">
        <RepeatItemForm
          onSubmit={handleRepeat}
          transaction={transactionToRepeat}
        />
      </ModalComponent>

      <ModalComponent code={ModalCode.categoryList} title="Categories">
        <CategoryList categories={categories} />
      </ModalComponent>

      <ModalComponent code={ModalCode.monthTotals} title={`${monthKey} totals`}>
        <MonthTotals />
      </ModalComponent>

      <ModalComponent
        code={ModalCode.pieChart}
        title={null}
      >
        <MonthPieCharts />
      </ModalComponent>

      <ModalComponent code={ModalCode.monthGraphs} title={null}>
        <MonthlyBarChart />
      </ModalComponent>

      <ModalComponent code={ModalCode.totalGraphs} title={null}>
        <TotalBarChart />
      </ModalComponent>
    </>
  );
};
