import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import ModalComponent from "./components/ModalComponent";
import PlanSelector from "./components/PlanSelector";
import PlanView from "./components/PlanView";
import RepeatItemForm from "./components/RepeatItemForm";
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

function App() {
  const dispatch = useAppDispatch();
  const plans = useAppSelector((state) => state.plans);
  const transactionToRepeat = useAppSelector(
    (state) => state.modal.repeatTransaction
  );
  const [selectedPlanId, setSelectedPlanId] = React.useState<string | null>(
    null
  );

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

  useEffect(() => {
    if (!plans || plans.length === 0) {
      dispatch(
        addPlan({
          newPlanName: "My First plan",
          newPlanId: uuidv4(),
        })
      );
    }
  }, [plans, dispatch]);

  const handleRepeat = (
    transaction: Transaction,
    period: RepeatType,
    repeats: number
  ) => {
    // eslint-disable-next-line no-console
    console.log("[handleRepeat]", { transaction, period, repeats });
    repeatTransaction({
      dispatch,
      transaction,
      planId: selectedPlanId ?? "",
      period,
      repeats,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 sm:p-4">
      <div className="mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h1 className="text-2xl font-bold mb-4">MyFin</h1>

        <PlanSelector
          plans={plans}
          selectedPlanId={selectedPlanId}
          onSelectPlan={setSelectedPlanId}
        />

        <PlanView
          selectedPlan={selectedPlan}
          addTransaction={(planId, transaction) =>
            dispatch(addTransaction({ planId, transaction }))
          }
          updateTransaction={(planId, updatedTransaction) =>
            dispatch(updateTransaction({ planId, updatedTransaction }))
          }
          deleteTransaction={(planId, id) =>
            dispatch(deleteTransaction({ planId, transactionId: id }))
          }
        />

        <ModalComponent code={ModalCode.repeatItem} title="Repeat item">
          <RepeatItemForm
            onSubmit={handleRepeat}
            transaction={transactionToRepeat}
          />
        </ModalComponent>
      </div>
    </div>
  );
}

export default App;
