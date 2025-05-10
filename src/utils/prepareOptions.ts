import { Category } from "../types/entities";

export const prepareOptions = (
  category: Category
): { value: string; label: string } => ({
  value: category.id,
  label: category.name,
});
