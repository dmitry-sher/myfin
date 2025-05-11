import React, { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { CategoryList } from "./components/CategoryList";
import { Header } from "./components/Header";
import { ModalComponent } from "./components/ModalComponent";
import { MonthlyBarChart } from "./components/MonthlyBarChart";
import { MonthPieCharts } from "./components/MonthPieCharts";
import { MonthTotals } from "./components/MonthTotals";
import { PlanHeader } from "./components/PlanHeader";
import { PlanSelector } from "./components/PlanSelector";
import { PlanView } from "./components/PlanView";
import { RepeatItemForm } from "./components/RepeatItemForm";
import { CategoryLabelMapProvider } from "./context/CategoryLabelMapContext";
import {
  addPlan,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "./slices/plansSlice";
import { Transaction } from "./types/entities";
import { ModalCode, RepeatType } from "./utils/const";
import { repeatTransaction } from "./utils/repeatTransaction";
import { saveStore } from "./utils/saveStore";
import { RootState, store, useAppDispatch, useAppSelector } from "./store";

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const plans = useAppSelector((state) => state.plans);
  const categories = useAppSelector((state) => state.categories);
  const monthKey = useAppSelector(
    (state: RootState) => state.modal.totalsData.monthKey
  );
  const isHeaderSticky = useAppSelector(
    (state): boolean => state.appSettings.isHeaderSticky
  );
  const transactionToRepeat = useAppSelector(
    (state) => state.modal.repeatTransaction
  );
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

  useEffect(() => {
    saveStore(store.getState());
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && hash !== selectedPlanId) {
      setSelectedPlanId(hash);
    }

    if (!plans || plans.length === 0) {
      const newPlanId = uuidv4();
      dispatch(addPlan({ newPlanName: "My First plan", newPlanId }));
      setSelectedPlanId(newPlanId);
      window.location.hash = newPlanId;
    }
  }, [plans, dispatch, selectedPlanId]);

  const handleRepeat = (
    transaction: Transaction,
    period: RepeatType,
    repeats: number
  ): void => {
    repeatTransaction({
      dispatch,
      transaction,
      planId: selectedPlanId ?? "",
      period,
      repeats,
    });
  };

  const handleAddTransaction = (
    planId: string,
    transaction: Omit<Transaction, "id">
  ): void => {
    dispatch(addTransaction({ planId, transaction }));
  };

  const handleUpdateTransaction = (
    planId: string,
    updatedTransaction: Transaction
  ): void => {
    dispatch(updateTransaction({ planId, updatedTransaction }));
  };

  const handleDeleteTransaction = (planId: string, id: string): void => {
    dispatch(deleteTransaction({ planId, transactionId: id }));
  };

  const handleSelectPlan = (planId: string): void => {
    setSelectedPlanId(planId);
    window.location.hash = planId;
  };

  const wrapperClass = isHeaderSticky
    ? "overflow-y-auto h-[calc(100vh-25px)] print:overflow-hidden print:h-auto"
    : "";

  const headerClass = isHeaderSticky
    ? "sticky top-0 z-10 bg-white border-b shadow-sm"
    : "";

  return (
    <CategoryLabelMapProvider categories={categories}>
      <div className="min-h-screen bg-gray-100 p-0 print:p-2">
        <div className="mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6 print:p-0 print:shadow-none print:m-0">
          <div className={wrapperClass}>
            <div className={`print:hidden ${headerClass}`}>
              <Header />
              <PlanSelector
                plans={plans}
                selectedPlanId={selectedPlanId}
                onSelectPlan={handleSelectPlan}
              />

              <PlanHeader
                selectedPlan={selectedPlan}
                addTransaction={handleAddTransaction}
              />
            </div>

            <PlanView
              selectedPlan={selectedPlan}
              updateTransaction={handleUpdateTransaction}
              deleteTransaction={handleDeleteTransaction}
            />
          </div>

          <ModalComponent code={ModalCode.repeatItem} title="Repeat item">
            <RepeatItemForm
              onSubmit={handleRepeat}
              transaction={transactionToRepeat}
            />
          </ModalComponent>

          <ModalComponent code={ModalCode.categoryList} title="Categories">
            <CategoryList categories={categories} />
          </ModalComponent>

          <ModalComponent
            code={ModalCode.monthTotals}
            title={`${monthKey} totals`}
          >
            <MonthTotals />
          </ModalComponent>

          <ModalComponent
            code={ModalCode.pieChart}
            title={`${monthKey} pie charts`}
          >
            <MonthPieCharts />
          </ModalComponent>

          <ModalComponent
            code={ModalCode.monthGraphs}
            title={`${monthKey} graph`}
          >
            <MonthlyBarChart />
          </ModalComponent>
        </div>
      </div>
    </CategoryLabelMapProvider>
  );
};
