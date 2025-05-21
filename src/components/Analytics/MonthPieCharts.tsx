import React, { FC, useMemo } from "react";

import { useAppSelector } from "../../store";
import { Category, GroupedCategory, Transaction } from "../../types/entities";
import { incomeCategoryKey } from "../../utils/const";
import {
  defaultGroupTransactionsByCategories,
  groupTransactionsByCategories,
} from "../../utils/groupTransactionsByCategories";

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
    const ret = groupTransactionsByCategories(transactions ?? [], categories);
    const { positiveTotal, negativeTotal } = ret;
    if (positiveTotal > negativeTotal) {
      const newCategory: GroupedCategory = {
        id: incomeCategoryKey,
        name: "income",
        total: positiveTotal + negativeTotal,
        transactions: [],
      };
      ret.negative.push(newCategory);
    }
    return ret;
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

