import React from "react";
import { useAppDispatch, useAppSelector } from "./store";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "./slices/plansSlice";
import PlanSelector from "./components/PlanSelector";
import PlanView from "./components/PlanView";

function App() {
  const dispatch = useAppDispatch();
  const plans = useAppSelector((state) => state.plans);
  const [selectedPlanId, setSelectedPlanId] = React.useState<string | null>(
    null
  );

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto bg-white shadow-md rounded-lg p-6">
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
