import React, { FC, useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";

import { useAppSelector } from "../../store";
import { OptionType } from "../../types/entities";
import { prepareOptions } from "../../utils/prepareOptions";

interface CategoryFilterProps {
  className?: string;
  onChange: (category: OptionType[] | null) => void;
  useAllDefault?: boolean;
}

export const CategoryFilter: FC<CategoryFilterProps> = ({
  onChange,
  className = "w-full sm:w-1/4",
  useAllDefault = false,
}) => {
  const categories = useAppSelector((state) => state.categories);
  const defaultCategoriesOptions = categories.map(prepareOptions);
  const [categoriesOptions, setCategoriesOptions] = useState(
    defaultCategoriesOptions
  );
  const [categoryIds, setCategoryIds] = useState<OptionType[]>(
    useAllDefault ? defaultCategoriesOptions : []
  );

  // reload categories options when global categories change
  useEffect(() => {
    const newCategoriesOptions = categories.map(prepareOptions);
    setCategoriesOptions(newCategoriesOptions);
  }, [categories]);

  const handleChange = (newValue: MultiValue<OptionType> | null): void => {
    const efValue = newValue ? [...newValue] : [];
    setCategoryIds(efValue);
    onChange(efValue);
  };

  const formatOptionLabel = (option: OptionType): React.ReactNode => {
    return (
      <span
        className="w-full py-1 px-2"
        style={{ backgroundColor: option.color }}
      >
        {option.label}
      </span>
    );
  };

  return (
    <div className={className}>
      <Select
        autoFocus
        isClearable
        isMulti
        defaultValue={[]}
        value={categoryIds}
        onChange={handleChange}
        options={categoriesOptions}
        className="text-sm"
        formatOptionLabel={formatOptionLabel}
        placeholder="Select filter categories..."
      />
    </div>
  );
};
