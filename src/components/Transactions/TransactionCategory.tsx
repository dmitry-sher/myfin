import React, { CSSProperties, FC, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

import { useCategoryLabelMap } from "../../context/CategoryLabelMapContext";
import { addCategory } from "../../slices/categoriesSlice";
import { useAppDispatch } from "../../store";
import { Category, OptionType } from "../../types/entities";
import { noCategoryName } from "../../utils/const";
import { generatePleasantColor } from "../../utils/generatePleasantColor";
import { prepareOptions } from "../../utils/prepareOptions";

interface TransactionCategoryProps {
  categoryId?: string;
  categories: Category[];
  onChange: (category: OptionType) => void;
}

export const TransactionCategory: FC<TransactionCategoryProps> = ({
  categoryId,
  categories,
  onChange,
}) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const { labelMap, colorMap } = useCategoryLabelMap();
  const defaultCategoriesOptions = categories.map(prepareOptions);
  const [categoriesOptions, setCategoriesOptions] = useState(
    defaultCategoriesOptions
  );

  const currentLabel = labelMap[categoryId ?? ""] ?? noCategoryName;

  // reload categories options when global categories change
  // this would lead to losing of any created options in select, but
  // in single user environment that should not happen
  useEffect(() => {
    const newCategoriesOptions = categories.map(prepareOptions);
    setCategoriesOptions(newCategoriesOptions);
  }, [categories]);

  const handleChange = (newValue: OptionType | null): void => {
    if (newValue) {
      onChange(newValue);
    }
    setIsEditing(false);
  };

  const handleCreate = (inputValue: string): void => {
    const newId = crypto.randomUUID();
    const color = generatePleasantColor();
    const newCategoryOption = { value: newId, label: inputValue, color };
    onChange(newCategoryOption);

    const newCategoriesOptions = [...categoriesOptions, newCategoryOption];
    setCategoriesOptions(newCategoriesOptions);
    dispatch(addCategory({ id: newId, name: inputValue, color }));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="w-full sm:w-1/4">
        <CreatableSelect
          autoFocus
          isClearable
          defaultValue={
            categoryId ? { value: categoryId, label: currentLabel } : null
          }
          onChange={handleChange}
          onCreateOption={handleCreate}
          options={categoriesOptions}
          onBlur={(): void => setIsEditing(false)}
          className="text-sm"
        />
      </div>
    );
  }

  return (
    <span
      className="w-1/4 text-center cursor-pointer hover:underline"
      onClick={(): void => setIsEditing(true)}
      style={{ backgroundColor: colorMap[categoryId ?? ""] } as CSSProperties}
    >
      {currentLabel}
    </span>
  );
};
