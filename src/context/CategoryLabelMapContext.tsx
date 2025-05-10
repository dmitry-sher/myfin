import React, { createContext, useContext, useMemo } from "react";

import { Category } from "../types/entities";

type LabelMap = Record<string, string>;
type CategoryContext = {
  labelMap: LabelMap;
  colorMap: LabelMap;
};

interface CategoryLabelMapProviderProps {
  categories: Category[];
  children: React.ReactNode;
}

const CategoryLabelMapContext = createContext<CategoryContext>({
  labelMap: {},
  colorMap: {},
});

export const CategoryLabelMapProvider: React.FC<
  CategoryLabelMapProviderProps
> = ({ categories, children }) => {
  const labelMap = useMemo((): LabelMap => {
    const result: LabelMap = {};
    for (const { id, name } of categories) {
      result[id] = name;
    }
    return result;
  }, [categories]);

  const colorMap = useMemo((): LabelMap => {
    const result: LabelMap = {};
    for (const { id, color } of categories) {
      result[id] = color ?? "";
    }
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
