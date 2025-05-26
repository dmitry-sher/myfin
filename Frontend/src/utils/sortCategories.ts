import { Category } from "../types/entities";

export const sortCategories = (a: Category, b: Category): number =>
  a.name.localeCompare(b.name);
