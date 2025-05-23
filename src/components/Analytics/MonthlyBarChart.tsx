import React, { FC, useMemo } from "react";
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
  }, [transactions, totalsStartingBalance, monthKey]);

  const allBars = useMemo(() => {
    if (!transactions) return [];

    return transactions.map((tx) => ({
      key: tx.id,
      color: colorMap[tx.categoryId ?? ""] ?? "#000000",
      label: tx.description,
    }));
  }, [transactions, colorMap]);

  return (
    <>
      <div className="h-72" style={{ width: "750px" }}>
        <ResponsiveContainer>
          <BarChart data={data} barCategoryGap={4} stackOffset="sign">
            <XAxis dataKey="day" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              formatter={(value: number, key: string): string[] => {
                const label = allBars.find((b) => b.key === key)?.label ?? key;
                return [`${value}`, label];
              }}
            />
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
            <Tooltip
              formatter={(value: number, key: string): string[] => {
                const label = allBars.find((b) => b.key === key)?.label ?? key;
                return [`${value}`, label];
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
