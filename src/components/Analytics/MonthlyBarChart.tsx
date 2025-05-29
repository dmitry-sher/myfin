import React, { FC, useEffect, useMemo, useState } from "react";
import { getDaysInMonth, parse } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useCategoryLabelMap } from "../../context/CategoryLabelMapContext";
import { useAppSelector } from "../../store";
import { Transaction } from "../../types/entities";
import { monthKeyFormat } from "../../utils/const";
import { CategoryFilter } from "../Filters/CategoryFilter";

type ChartItem = {
  day: string;
  dailySum: number;
  balance: number;
  [key: string]: number | string;
};

export const MonthlyBarChart: FC = () => {
  const { colorMap } = useCategoryLabelMap();
  const {
    totalsStartingBalance,
    totalsTransactions: transactions,
    monthKey,
  } = useAppSelector((state) => state.modal.totalsData);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);

  useEffect(() => {
    setCategoryIds([]);
  }, [monthKey]);

  const data = useMemo(() => {
    const grouped: Record<string, Transaction[]> = {};
    const date = parse(monthKey ?? "", monthKeyFormat, new Date());
    const days = getDaysInMonth(date);
    for (let i = 0; i < days; i++) {
      const day = (i + 1).toString().padStart(2, "0");
      if (!grouped[day]) grouped[day] = [];
    }

    if (!transactions) return [];

    for (const tx of transactions) {
      if (categoryIds.length && !categoryIds.includes(tx.categoryId ?? ""))
        continue;
      const day = tx.trueDate.getDate().toString().padStart(2, "0");
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(tx);
    }

    const sortedDays = Object.entries(grouped)
      .map(([day, txs]) => {
        const item: ChartItem = { day, dailySum: 0, balance: 0 };
        for (const tx of txs) {
          const key = tx.id;
          item[key] = tx.amount;
          item.dailySum += tx.amount;
        }

        return item;
      })
      .sort(
        (a, b) => parseInt(a.day as string, 10) - parseInt(b.day as string, 10)
      );

    let runningBalance = totalsStartingBalance ?? 0;
    for (const item of sortedDays) {
      runningBalance += item.dailySum;
      item.balance = runningBalance;
    }

    return sortedDays;
  }, [transactions, totalsStartingBalance, monthKey, categoryIds]);

  const allBars = useMemo(() => {
    if (!transactions) return [];

    return transactions.map((tx) => ({
      key: tx.id,
      color: colorMap[tx.categoryId ?? ""] ?? "#000000",
      label: tx.description,
    }));
  }, [transactions, colorMap]);

  const formatter = (value: number, key: string): string[] => {
    const label = allBars.find((b) => b.key === key)?.label ?? key;
    return [`${value}`, label];
  };

  const handleCategoriesChange = (
    category: { value: string }[] | null
  ): void => {
    if (!category || category.length === 0) {
      setCategoryIds([]);
      return;
    }
    setCategoryIds(category.map((c) => c.value));
  };

  return (
    <>
      <div
        className="flex justify-between border-b pb-3 mb-4"
        style={{ width: "750px" }}
      >
        <h2 className="text-xl font-semibold pt-1">{monthKey} graphs</h2>
        <CategoryFilter
          onChange={handleCategoriesChange}
          className="w-3/4"
          useAllDefault
        />
      </div>
      <div className="h-72" style={{ width: "750px" }}>
        <ResponsiveContainer>
          <BarChart data={data} barCategoryGap={4} stackOffset="sign">
            <XAxis dataKey="day" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip formatter={formatter} />
            {allBars.map(({ key, color }) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="stack"
                fill={color}
                isAnimationActive={false}
              >
                <Cell fill={color} />
              </Bar>
            ))}
            <ReferenceLine y={0} stroke="#ccc" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="h-72" style={{ width: "750px" }}>
        <ResponsiveContainer>
          <LineChart data={data} barCategoryGap={4}>
            <XAxis dataKey="day" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <ReferenceLine y={0} stroke="#ccc" />
            <Line
              data={data}
              type="monotone"
              dataKey="balance"
              stroke="#8884d8"
              isAnimationActive={false}
            />
            <Tooltip formatter={formatter} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
