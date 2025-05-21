import { useMemo } from "react";

import { Transaction } from "../types/entities";

type UseMonthTotalsProps = {
  monthTransactions: Transaction[];
  startingRunningBalance: number;
};

type UseMonthTotalsReturn = {
  monthlyInTotalPlan: number;
  monthlyOutTotalPlan: number;
  monthlyInTotalFact: number;
  monthlyOutTotalFact: number;
  monthBalance: number;
  monthBalanceFact: number;
  transactionsBalances: Record<string, number>;
};

export const useMonthTotals = ({
  monthTransactions,
  startingRunningBalance,
}: UseMonthTotalsProps): UseMonthTotalsReturn => {
  const {
    monthlyInTotalPlan,
    monthlyOutTotalPlan,
    monthlyInTotalFact,
    monthlyOutTotalFact,
    monthBalance,
    monthBalanceFact,
    transactionsBalances,
  } = useMemo(() => {
    // eslint-disable-next-line no-shadow
    let monthlyInTotalPlan = 0;
    // eslint-disable-next-line no-shadow
    let monthlyOutTotalPlan = 0;
    // eslint-disable-next-line no-shadow
    let monthlyInTotalFact = 0;
    // eslint-disable-next-line no-shadow
    let monthlyOutTotalFact = 0;
    // eslint-disable-next-line no-shadow
    let runningBalance = startingRunningBalance;
    // eslint-disable-next-line no-shadow
    let monthBalance = 0;
    // eslint-disable-next-line no-shadow
    let monthBalanceFact = 0;
    // eslint-disable-next-line no-shadow
    const transactionsBalances: Record<string, number> = {};

    monthTransactions.forEach((transaction) => {
      runningBalance += transaction.amount;
      monthBalance += transaction.amount;
      if (transaction.isDone) {
        monthBalanceFact += transaction.amount;
      }

      if (transaction.amount > 0) {
        if (transaction.isDone) {
          monthlyInTotalFact += transaction.amount;
        }
        monthlyInTotalPlan += transaction.amount;
      }
      if (transaction.amount <= 0) {
        if (transaction.isDone) {
          monthlyOutTotalFact += transaction.amount;
        }
        monthlyOutTotalPlan += transaction.amount;
      }
      transactionsBalances[transaction.id] = runningBalance;
    });
    return {
      monthlyInTotalPlan,
      monthlyOutTotalPlan,
      monthlyInTotalFact,
      monthlyOutTotalFact,
      monthBalance,
      monthBalanceFact,
      transactionsBalances,
    };
  }, [monthTransactions, startingRunningBalance]);
  return {
    monthlyInTotalPlan,
    monthlyOutTotalPlan,
    monthlyInTotalFact,
    monthlyOutTotalFact,
    monthBalance,
    monthBalanceFact,
    transactionsBalances,
  };
};
