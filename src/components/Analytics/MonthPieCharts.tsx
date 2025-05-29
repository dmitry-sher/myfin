import React, { FC, useEffect, useMemo, useState } from "react";

import { useAppSelector } from "../../store";
import { Category, GroupedCategory, Transaction } from "../../types/entities";
import { incomeCategoryKey } from "../../utils/const";
import {
  defaultGroupTransactionsByCategories,
  groupTransactionsByCategories,
} from "../../utils/groupTransactionsByCategories";
import { CategoryFilter } from "../Filters/CategoryFilter";

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
  const { totalsTransactions: transactions, monthKey } = useAppSelector(
    (state) => state.modal.totalsData
  );
  const [categoryIds, setCategoryIds] = useState<string[]>([]);

  useEffect(() => {
    setCategoryIds([]);
  }, [monthKey]);

  const { positive, negative } = useMemo(() => {
    if (isNoData(transactions, categories)) {
      return defaultGroupTransactionsByCategories;
    }
    const ret = groupTransactionsByCategories(transactions ?? [], categories);
    const { positiveTotal, negativeTotal } = ret;
    if (Math.abs(positiveTotal) > Math.abs(negativeTotal)) {
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

  const handleCategoriesChange = (
    category: { value: string }[] | null
  ): void => {
    if (!category || category.length === 0) {
      setCategoryIds([]);
      return;
    }
    setCategoryIds(category.map((c) => c.value));
  };

  if (isNoData(transactions, categories)) {
    return null;
  }

  return (
    <>
      <div
        className="flex justify-between border-b pb-3 mb-4"
        style={{ width: "750px" }}
      >
        <h2 className="text-xl font-semibold pt-1">{monthKey} pie charts</h2>
        <CategoryFilter
          onChange={handleCategoriesChange}
          className="w-3/4"
          useAllDefault
        />
      </div>
      <div style={{ width: "750px" }}>
        <CategoryPieChart data={positive} categoryIds={categoryIds} />
        <CategoryPieChart data={negative} categoryIds={categoryIds} />
      </div>
    </>
  );
};
