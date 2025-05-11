import React, { FC, useMemo } from "react";

import { useAppSelector } from "../store";
import { Category, Transaction } from "../types/entities";
import {
  defaultGroupTransactionsByCategories,
  groupTransactionsByCategories,
} from "../utils/groupTransactionsByCategories";

import { CategoryPieChart } from "./SinglePieChart";

const isNoData = (
  transactions: Transaction[] | undefined,
  categories: Category[] | undefined
): boolean =>
  !categories ||
  categories.length === 0 ||
  !transactions ||
  transactions.length === 0;

export const MonthPieCharts: FC = () => {
  const categories = useAppSelector((state): Category[] => state.categories);
  const transactions = useAppSelector(
    (state): Transaction[] | undefined => state.modal.totalsData.totalsTransactions
  );
  const { positive, negative } = useMemo(() => {
    if (isNoData(transactions, categories)) {
      return defaultGroupTransactionsByCategories;
    }
    return groupTransactionsByCategories(transactions ?? [], categories);
  }, [transactions, categories]);

  if (isNoData(transactions, categories)) {
    return null;
  }

  return (
    <div style={{ width: "750px" }}>
      <CategoryPieChart data={positive} title="Income" />
      <CategoryPieChart data={negative} title="Expenses" />
    </div>
  );
};

