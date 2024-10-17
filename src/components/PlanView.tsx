import React, { FC } from "react";

import { Plan, Transaction } from "../types/entities";

import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

type PlanViewProps = {
  selectedPlan?: Plan;
  addTransaction: (
    planId: string,
    transaction: Omit<Transaction, "id">
  ) => void;
  updateTransaction: (planId: string, updatedTransaction: Transaction) => void;
  deleteTransaction: (planId: string, id: string) => void;
};

export const PlanView: FC<PlanViewProps> = ({
  selectedPlan,
  addTransaction,
  updateTransaction,
  deleteTransaction
}) => {
  if (!selectedPlan) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xl mb-4">
        Plan: {selectedPlan.name}
        <span className="text-green-600 ml-2">
          (Balance:{" "}
          {selectedPlan.transactions.reduce((acc, t) => acc + t.amount, 0)})
        </span>
      </h2>

      <TransactionForm
        onAddTransaction={(transaction) =>
          addTransaction(selectedPlan.id, transaction)
        }
      />

      <TransactionList
        transactions={selectedPlan.transactions}
        onUpdateTransaction={(transaction) =>
          updateTransaction(selectedPlan.id, transaction)
        }
        onDeleteTransaction={(id) => deleteTransaction(selectedPlan.id, id)}
      />
    </div>
  );
};

export default PlanView;
