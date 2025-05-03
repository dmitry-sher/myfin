import React, { FC } from "react";

import { Plan, Transaction } from "../types/entities";

import { TransactionForm } from "./TransactionForm";

type PlanHeaderProps = {
  selectedPlan?: Plan;
  addTransaction: (
    planId: string,
    transaction: Omit<Transaction, "id">
  ) => void;
};

export const PlanHeader: FC<PlanHeaderProps> = ({
  selectedPlan,
  addTransaction,
}) => {
  if (!selectedPlan) {
    return null;
  }

  return (
    <>
      <h2 className="text-xl mb-4 mt-4">
        Plan: {selectedPlan.name}
        <span className="text-green-600 ml-2">
          (Balance:{" "}
          {selectedPlan.transactions.reduce((acc, t) => acc + t.amount, 0)})
        </span>
      </h2>

      <TransactionForm
        onAddTransaction={(transaction): void =>
          addTransaction(selectedPlan.id, transaction)
        }
      />
    </>
  );
};
