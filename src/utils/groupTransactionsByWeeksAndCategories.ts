import { addWeeks, endOfWeek, format, getWeek, startOfWeek } from "date-fns";

import { Transaction, WeekTotals } from "../types/entities";

import { russianFormat } from "./const";

const formatDateRange = (dateInWeek: Date): string => {
  const startDate = startOfWeek(dateInWeek, { weekStartsOn: 1 });
  const endDate = endOfWeek(dateInWeek, { weekStartsOn: 1 });
  return [
    format(startDate, russianFormat),
    "-",
    format(endDate, russianFormat),
  ].join("");
};

type BarType = {
  key: string;
  color: string;
  label: string;
};

type GroupTransactionsByWeekAndCategory = {
  weekTotals: WeekTotals[];
  allBars: BarType[];
};

const defaultReturn: GroupTransactionsByWeekAndCategory = {
  weekTotals: [],
  allBars: [],
};

export const groupTransactionsByWeekAndCategory = (
  transactions: Transaction[],
  categoryLabelMap: Record<string, string> = {},
  categoryColorMap: Record<string, string> = {},
  categoryIds: string[] = []
): GroupTransactionsByWeekAndCategory => {
  if (!transactions.length) return defaultReturn;

  // Sort by trueDate ascending
  const sortedTxs = [...transactions].sort(
    (a, b) => a.trueDate.getTime() - b.trueDate.getTime()
  );

  const firstDate = startOfWeek(sortedTxs[0].trueDate, { weekStartsOn: 1 });
  const lastDate = endOfWeek(sortedTxs[sortedTxs.length - 1].trueDate, {
    weekStartsOn: 1,
  });

  const weeksMap = new Map<number, WeekTotals>();
  let runningBalance = 0;

  // Group transactions into weeks
  for (const tx of sortedTxs) {
    const weekNumber = getWeek(tx.trueDate, { weekStartsOn: 1 });
    const category = tx.categoryId || "uncategorized";
    if (categoryIds.length > 0 && !categoryIds.includes(category)) continue;

    if (!weeksMap.has(weekNumber)) {
      weeksMap.set(weekNumber, {
        weekNumber,
        weekDates: formatDateRange(tx.trueDate),
        balance: runningBalance,
        totalsByCategory: {},
        transactions: [],
      });
    }

    const summary = weeksMap.get(weekNumber);
    if (!summary) continue;
    summary.balance += tx.amount;
    runningBalance += tx.amount;
    summary.totalsByCategory[category] =
      (summary.totalsByCategory[category] || 0) + tx.amount;
    summary.transactions.push(tx);
    summary[`${weekNumber}-${category}`] = summary.totalsByCategory[category];
  }

  // Fill in missing weeks
  const weekTotals: WeekTotals[] = [];
  let cursor = new Date(firstDate);

  while (cursor <= lastDate) {
    const weekNumber = getWeek(cursor, { weekStartsOn: 1 });

    if (weeksMap.has(weekNumber)) {
      weekTotals.push(weeksMap.get(weekNumber) as WeekTotals);
      cursor = addWeeks(cursor, 1);
      continue;
    }

    const previousWeek = weekTotals[weekTotals.length - 1];
    weekTotals.push({
      weekNumber,
      balance: previousWeek.balance,
      totalsByCategory: {},
      weekDates: formatDateRange(cursor),
      transactions: [],
    });

    cursor = addWeeks(cursor, 1);
  }

  // create bars for bar chart
  const allBars: BarType[] = [];
  for (const week of weekTotals) {
    for (const categoryId of Object.keys(week.totalsByCategory)) {
      allBars.push({
        key: `${week.weekNumber}-${categoryId}`,
        color: categoryColorMap[categoryId] ?? "#000000",
        label: categoryLabelMap[categoryId] ?? categoryId,
      });
    }
  }

  return {
    weekTotals,
    allBars,
  };
};
