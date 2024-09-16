import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import PlanSelector from "./components/PlanSelector";
import { Plan, Transaction } from "./types/entities";

function App() {
  // Load plans from localStorage
  const loadPlans = (): Plan[] => {
    const storedPlans = localStorage.getItem("plans");
    return storedPlans ? JSON.parse(storedPlans) : [];
  };

  // State to hold the list of plans and selected plan
  const [plans, setPlans] = useState<Plan[]>(loadPlans);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // Save plans to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("plans", JSON.stringify(plans));
  }, [plans]);

  // Add a new transaction to a specified plan
  const addTransaction = (
    planId: string,
    transaction: Omit<Transaction, "id">
  ) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              transactions: [
                { ...transaction, id: uuidv4() },
                ...plan.transactions,
              ],
            }
          : plan
      )
    );
  };

  // Update an existing transaction in a specified plan
  const updateTransaction = (
    planId: string,
    updatedTransaction: Transaction
  ) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              transactions: plan.transactions.map((transaction) =>
                transaction.id === updatedTransaction.id
                  ? updatedTransaction
                  : transaction
              ),
            }
          : plan
      )
    );
  };

  // Delete a transaction from a specified plan
  const deleteTransaction = (planId: string, id: string) => {
    if (!window.confirm("Are you sure?")) return;
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              transactions: plan.transactions.filter(
                (transaction) => transaction.id !== id
              ),
            }
          : plan
      )
    );
  };

  // Add a new plan
  const addPlan = (planName: string) => {
    if (plans.some((plan) => plan.name === planName)) {
      alert("Plan with this name already exists.");
      return;
    }
    setPlans([...plans, { id: uuidv4(), name: planName, transactions: [] }]);
  };

  // Get the currently selected plan
  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">MyFin</h1>

        {/* Plan Selector */}
        <PlanSelector
          plans={plans}
          selectedPlanId={selectedPlanId}
          onSelectPlan={setSelectedPlanId}
        />

        {selectedPlan && (
          <div>
            <h2 className="text-xl mb-4">
              Plan: {selectedPlan.name}
              <span className="text-green-600 ml-2">
                (Balance:{" "}
                {selectedPlan.transactions.reduce(
                  (acc, t) => acc + t.amount,
                  0
                )}
                )
              </span>
            </h2>

            {/* Add Transaction Form */}
            <TransactionForm
              onAddTransaction={(transaction) =>
                addTransaction(selectedPlan.id, transaction)
              }
            />

            {/* Transactions List */}
            <TransactionList
              transactions={selectedPlan.transactions}
              onUpdateTransaction={(transaction) =>
                updateTransaction(selectedPlan.id, transaction)
              }
              onDeleteTransaction={(id) =>
                deleteTransaction(selectedPlan.id, id)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
