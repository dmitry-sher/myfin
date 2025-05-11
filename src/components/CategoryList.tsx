import React, { FC } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { removeCategory, updateColor } from "../slices/categoriesSlice";
import { useAppDispatch } from "../store";
import { Category } from "../types/entities";

import { ColorPicker } from "./ColorPicker";

interface CategoryListProps {
  categories: Category[];
}

export const CategoryList: FC<CategoryListProps> = ({ categories }) => {
  const dispatch = useAppDispatch();

  const onRemoveCategory = (categoryId: string): void => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure to delete category?")) {
      dispatch(removeCategory(categoryId));
    }
  };

  const onChangeColor = (categoryId: string, color: string): void => {
    dispatch(updateColor({ id: categoryId, color }));
  };

  return (
    <div className="w-full">
      <div className="flex font-bold border-b py-2 text-left w-96">
        <span className="w-3/5">Name</span>
        <span className="w-1/5">Color</span>
        <span className="w-1/5 text-right">Actions</span>
      </div>

      {categories.map((category) => {
        const handleRemoveCategory = (): void => onRemoveCategory(category.id);
        const handleColorChange = (color: string): void =>
          onChangeColor(category.id, color);
        return (
          <div key={category.id} className="flex items-center py-2 border-b">
            <span className="w-3/5">{category.name}</span>
            <div className="w-1/5">
              <ColorPicker
                color={category.color ?? ""}
                onAccept={handleColorChange}
              />
            </div>
            <div className="w-1/5 text-right">
              <button
                className={"bg-red-500 p-1"}
                onClick={handleRemoveCategory}
                title="Remove"
              >
                <div className="sm:hidden">Remove</div>
                <FontAwesomeIcon
                  icon={faClose}
                  className="hidden sm:block text-white"
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
