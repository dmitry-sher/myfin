import React, { createContext, useContext, useMemo } from "react";

import { Category } from "../types/entities";

type CategoryLabelMap = Record<string, string>;

interface CategoryLabelMapProviderProps {
  categories: Category[];
  children: React.ReactNode;
}

const CategoryLabelMapContext = createContext<CategoryLabelMap>({});

export const CategoryLabelMapProvider: React.FC<
  CategoryLabelMapProviderProps
> = ({ categories, children }) => {
  const map = useMemo((): CategoryLabelMap => {
    const result: CategoryLabelMap = {};
    for (const { id, name } of categories) {
      result[id] = name;
    }
    return result;
  }, [categories]);

  return (
    <CategoryLabelMapContext.Provider value={map}>
      {children}
    </CategoryLabelMapContext.Provider>
  );
};

export const useCategoryLabelMap = (): CategoryLabelMap => useContext(CategoryLabelMapContext);
