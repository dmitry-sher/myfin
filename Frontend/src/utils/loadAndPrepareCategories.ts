import { Category } from "../types/entities";

import { categoriesStorageKey } from "./const";

export const loadAndPrepareCategories = (): Category[] => {
  try {
    const categories: Category[] = JSON.parse(
      localStorage.getItem(categoriesStorageKey) || "[]"
    );
    return categories;
  }
  catch (e) {
    console.error("[loadAndPrepareTransactions] error!", e);
    return [];
  }
};
