import React, { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { MonthlyBarChart } from "./components/Analytics/MonthlyBarChart";
import { MonthPieCharts } from "./components/Analytics/MonthPieCharts";
import { MonthTotals } from "./components/Analytics/MonthTotals";
import { CategoryList } from "./components/CategoryList";
import { Header } from "./components/Header";
import { KeyboardShortcuts } from "./components/KeyboardShortcuts";
import { ModalComponent } from "./components/ModalComponent";
import { PlanHeader } from "./components/Plans/PlanHeader";
import { PlanSelector } from "./components/Plans/PlanSelector";
import { PlanView } from "./components/Plans/PlanView";
import { RepeatItemForm } from "./components/Transactions/RepeatItemForm";
import { AppContext } from "./context/AppContext";
import { CategoryLabelMapProvider } from "./context/CategoryLabelMapContext";
import {
  addPlan,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "./slices/plansSlice";
import { Transaction } from "./types/entities";
import { ModalCode, RepeatType } from "./utils/const";
import { findAndSelectPlan } from "./utils/findAndSelectPlan";
import { repeatTransaction } from "./utils/repeatTransaction";
import { saveStore } from "./utils/saveStore";
import { RootState, store, useAppDispatch, useAppSelector } from "./store";

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const plans = useAppSelector((state) => state.plans);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isHeaderSticky, setIsHeaderSticky] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    React.useState<Transaction | null>(null);
  const categories = useAppSelector((state) => state.categories);
  const monthKey = useAppSelector(
    (state: RootState) => state.modal.totalsData.monthKey
  );
  const transactionToRepeat = useAppSelector(
    (state) => state.modal.repeatTransaction
  );
  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

  useEffect(() => {
    saveStore(store.getState());
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && hash !== selectedPlan?.id) {
      findAndSelectPlan(setSelectedPlanId, hash);
    }

    if (!plans || plans.length === 0) {
      const newPlanId = uuidv4();
      const newPlan = { newPlanName: "My First plan", newPlanId };
      dispatch(addPlan(newPlan));
      setTimeout(() => {
        findAndSelectPlan(setSelectedPlanId, newPlanId);
      }, 250);
    }
  }, [plans, dispatch, selectedPlan]);

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
    findAndSelectPlan(setSelectedPlanId, planId);
  };

  const wrapperClass = isHeaderSticky
    ? "overflow-y-auto h-[calc(100vh-25px)] print:overflow-hidden print:h-auto"
    : "";

  const headerClass = isHeaderSticky
    ? "sticky top-0 z-10 bg-white border-b shadow-sm"
    : "";

  return (
    <CategoryLabelMapProvider categories={categories}>
      <AppContext.Provider
        value={{
          selectedPlan,
          setSelectedPlanId,
          selectedTransaction,
          setSelectedTransaction,
          isHeaderSticky,
          setIsHeaderSticky,
          isFocused,
          setIsFocused,
        }}
      >
        <div className="min-h-screen bg-gray-100 p-0 print:p-2">
          <div className="mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6 print:p-0 print:shadow-none print:m-0">
            <div className={wrapperClass}>
              <div className={`print:hidden ${headerClass}`}>
                <Header />
                <PlanSelector plans={plans} onSelectPlan={handleSelectPlan} />

                <PlanHeader addTransaction={handleAddTransaction} />
              </div>

              <PlanView
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
        <KeyboardShortcuts />
      </AppContext.Provider>
    </CategoryLabelMapProvider>
  );
};
