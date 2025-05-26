import React, { createContext, FC, ReactNode, useContext, useMemo } from "react";

import { Category } from "../types/entities";
import { incomeCategoryColor, incomeCategoryKey } from "../utils/const";

type LabelMap = Record<string, string>;
type CategoryContext = {
  labelMap: LabelMap;
  colorMap: LabelMap;
};

interface CategoryLabelMapProviderProps {
  categories: Category[];
  children: ReactNode;
}

const CategoryLabelMapContext = createContext<CategoryContext>({
  labelMap: {},
  colorMap: {},
});

export const CategoryLabelMapProvider: FC<
  CategoryLabelMapProviderProps
> = ({ categories, children }) => {
  const labelMap = useMemo((): LabelMap => {
    const result: LabelMap = {};
    for (const { id, name } of categories) {
      result[id] = name;
    }
    result[incomeCategoryKey] = "Income";
    return result;
  }, [categories]);

  const colorMap = useMemo((): LabelMap => {
    const result: LabelMap = {};
    for (const { id, color } of categories) {
      result[id] = color ?? "";
    }
    result[incomeCategoryKey] = incomeCategoryColor;
    return result;
  }, [categories]);

  const context = {
    labelMap,
    colorMap,
  };

  return (
    <CategoryLabelMapContext.Provider value={context}>
      {children}
    </CategoryLabelMapContext.Provider>
  );
};

export const useCategoryLabelMap = (): CategoryContext =>
  useContext(CategoryLabelMapContext);
