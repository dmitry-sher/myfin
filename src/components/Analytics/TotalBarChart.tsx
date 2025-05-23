import React, { FC, useMemo } from "react";
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
import { groupTransactionsByWeekAndCategory } from "../../utils/groupTransactionsByWeeksAndCategories";

export const TotalBarChart: FC = () => {
  const { totalsTransactions: transactions } = useAppSelector(
    (state) => state.modal.totalsData
  );

  const { labelMap, colorMap } = useCategoryLabelMap();

  const { weekTotals: data, allBars } = useMemo(() => {
    const ret = groupTransactionsByWeekAndCategory(
      transactions ?? [],
      labelMap,
      colorMap
    );
    // eslint-disable-next-line no-console
    console.log("[totalbarchart] data", ret);
    return ret;
  }, [transactions, labelMap, colorMap]);

  return (
    <>
      <div className="h-72" style={{ width: "750px" }}>
        <ResponsiveContainer>
          <BarChart data={data} barCategoryGap={4}>
            <XAxis dataKey="weekDates" />
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
            <XAxis dataKey="weekDates" />
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
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
