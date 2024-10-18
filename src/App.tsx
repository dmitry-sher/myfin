import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import PlanSelector from "./components/PlanSelector";
import PlanView from "./components/PlanView";
import {
  addPlan,
  addTransaction,
  deleteTransaction,
  updateTransaction
} from "./slices/plansSlice";
import { useAppDispatch, useAppSelector } from "./store";

function App() {
  const dispatch = useAppDispatch();
  const plans = useAppSelector((state) => state.plans);
  const [selectedPlanId, setSelectedPlanId] = React.useState<string | null>(
    null
  );

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

  useEffect(() => {
    if (!plans || plans.length === 0) {
      dispatch(addPlan({
        newPlanName: "My First plan",
        newPlanId: uuidv4()
      }));
    }
  }, [plans, dispatch]);

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
      </div>
    </div>
  );
}

export default App;
