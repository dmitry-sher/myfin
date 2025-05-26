import { Category, OptionType } from "../types/entities";

export const prepareOptions = (
  category: Category
): OptionType => ({
  value: category.id,
  label: category.name,
  color: category.color,
});
