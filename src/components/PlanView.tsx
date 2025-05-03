import React, { FC } from "react";

import { Plan, Transaction } from "../types/entities";

import { TransactionList } from "./TransactionList";

type PlanViewProps = {
  selectedPlan?: Plan;
  updateTransaction: (planId: string, updatedTransaction: Transaction) => void;
  deleteTransaction: (planId: string, id: string) => void;
};

export const PlanView: FC<PlanViewProps> = ({
  selectedPlan,
  updateTransaction,
  deleteTransaction,
}) => {
  if (!selectedPlan) {
    return null;
  }

  return (
    <TransactionList
      transactions={selectedPlan.transactions}
      onUpdateTransaction={(transaction): void =>
        updateTransaction(selectedPlan.id, transaction)
      }
      onDeleteTransaction={(id): void => deleteTransaction(selectedPlan.id, id)}
    />
  );
};
