import React, { FC, ReactNode, useMemo } from "react";

import { useAppSelector } from "../../store";
import { Category, GroupedCategory, Transaction } from "../../types/entities";
import {
  defaultGroupTransactionsByCategories,
  groupTransactionsByCategories,
} from "../../utils/groupTransactionsByCategories";
import { ViewAmount } from "../ViewAmount";

const isNoData = (
  transactions: Transaction[] | undefined,
  categories: Category[] | undefined
): boolean =>
  !categories ||
  categories.length === 0 ||
  !transactions ||
  transactions.length === 0;

export const MonthTotals: FC = () => {
  const categories = useAppSelector((state): Category[] => state.categories);
  const transactions = useAppSelector(
    (state): Transaction[] | undefined => state.modal.totalsData.totalsTransactions
  );
  const { positive, negative, positiveTotal, negativeTotal } = useMemo(() => {
    if (isNoData(transactions, categories)) {
      return defaultGroupTransactionsByCategories;
    }
    return groupTransactionsByCategories(transactions ?? [], categories);
  }, [transactions, categories]);

  if (isNoData(transactions, categories)) {
    return null;
  }

  const renderTable = (
    title: string,
    items: GroupedCategory[],
    totalBalance: number
  ): ReactNode => (
    <div className="mb-8 w-96">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border w-3/4">Category</th>
            <th className="p-2 border w-1/4">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ id, name, total }) => (
            <tr key={id} className="border-t">
              <td className="p-2 border w-3/4">{name}</td>
              <td
                className={`p-2 w-1/4 border ${
                  total >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                <ViewAmount balancePlan={total} className="block h-6 w-6" />
              </td>
            </tr>
          ))}
          <tr key="totals" className="border-t bg-gray-100">
            <td className="p-2 border w-3/4">Total</td>
            <td className={"p-2 w-1/4 border "}>
              <ViewAmount
                balancePlan={totalBalance}
                className="block h-6 w-6"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="w-full">
      {renderTable("Income Categories", positive, positiveTotal)}
      {renderTable("Expense Categories", negative, negativeTotal)}
    </div>
  );
};
