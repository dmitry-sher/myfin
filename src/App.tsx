import React, { FC, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Header } from "./components/Header";
import { ModalComponent } from "./components/ModalComponent";
import { PlanHeader } from "./components/PlanHeader";
import { PlanSelector } from "./components/PlanSelector";
import { PlanView } from "./components/PlanView";
import { RepeatItemForm } from "./components/RepeatItemForm";
import {
  addPlan,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "./slices/plansSlice";
import { Transaction } from "./types/entities";
import { ModalCode, RepeatType } from "./utils/const";
import { repeatTransaction } from "./utils/repeatTransaction";
import { useAppDispatch, useAppSelector } from "./store";

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const plans = useAppSelector((state) => state.plans);
  const isHeaderSticky = useAppSelector(
    (state): boolean => state.appSettings.isHeaderSticky
  );
  const transactionToRepeat = useAppSelector(
    (state) => state.modal.repeatTransaction
  );
  const [selectedPlanId, setSelectedPlanId] = React.useState<string | null>(
    null
  );

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

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
    ? "overflow-y-auto h-[calc(100vh-100px)]"
    : "";

  const headerClass = isHeaderSticky
    ? "sticky top-0 z-10 bg-white border-b shadow-sm"
    : "";

  return (
    <div className="min-h-screen bg-gray-100 sm:p-4">
      <div className="mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6">
        <div className={wrapperClass}>
          <div className={headerClass}>
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
      </div>
    </div>
  );
};
