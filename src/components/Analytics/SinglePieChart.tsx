import React, { FC, ReactNode } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useCategoryLabelMap } from "../../context/CategoryLabelMapContext";
import { GroupedCategory } from "../../types/entities";

interface CategoryPieChartProps {
  data: GroupedCategory[];
  categoryIds?: string[];
}

const extractLabel = ({
  name,
  percent,
}: {
  name: string;
  percent: number;
}): string => `${name} (${(percent * 100).toFixed(1)}%)`;

export const CategoryPieChart: FC<CategoryPieChartProps> = ({
  data,
  categoryIds = [],
}) => {
  const { colorMap } = useCategoryLabelMap();
  const chartData = data
    .filter((group) => group.total !== 0)
    .filter((group) => {
      if (categoryIds.length === 0) return true;
      return categoryIds.includes(group.id);
    })
    .map((group) => ({
      name: group.name,
      value: Math.abs(group.total),
      color: colorMap[group.id] ?? "#000000",
    }));

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={extractLabel}
            isAnimationActive={false}
          >
            {chartData.map(
              (entry, index): ReactNode => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              )
            )}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
