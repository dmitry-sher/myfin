import { Category, GroupedCategory, Transaction } from "../types/entities";

import { noCategoryKey, noCategoryName } from "./const";

type GroupTransactionsByCategories = {
  positive: GroupedCategory[];
  negative: GroupedCategory[];
  positiveTotal: number;
  negativeTotal: number;
};

export const defaultGroupTransactionsByCategories: GroupTransactionsByCategories =
  {
    positive: [],
    negative: [],
    positiveTotal: 0,
    negativeTotal: 0,
  };

export function groupTransactionsByCategories(
  transactions: Transaction[],
  categories: Category[]
): GroupTransactionsByCategories {
  const map: Record<string, GroupedCategory> = {};
  const categoryNameMap = Object.fromEntries(
    categories.map((cat) => [cat.id, cat.name])
  );

  for (const tx of transactions) {
    const id = tx.categoryId ?? noCategoryKey;
    const name = categoryNameMap[id] ?? noCategoryName;

    if (!map[id]) {
      map[id] = {
        id,
        name,
        transactions: [],
        total: 0,
      };
    }

    map[id].transactions.push(tx);
    map[id].total += tx.amount;
  }

  const allCategories = Object.values(map);
  const positive = allCategories.filter((cat) => cat.total >= 0);
  const negative = allCategories.filter((cat) => cat.total < 0);
  const positiveTotal = positive.reduce((acc, cat) => acc + cat.total, 0);
  const negativeTotal = negative.reduce((acc, cat) => acc + cat.total, 0);
  return { positive, negative, positiveTotal, negativeTotal };
}
