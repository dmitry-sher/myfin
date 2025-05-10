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
      <div className="grid grid-cols-3 font-bold border-b py-2 text-left">
        <span>Name</span>
        <span>Color</span>
        <span>Actions</span>
      </div>

      {categories.map((category) => {
        const handleRemoveCategory = (): void => onRemoveCategory(category.id);
        const handleColorChange = (color: string): void =>
          onChangeColor(category.id, color);
        return (
          <div
            key={category.id}
            className="grid grid-cols-3 items-center py-2 border-b"
          >
            <span className="w-1/3">{category.name}</span>
            <div className="w-1/3">
              <ColorPicker
                color={category.color ?? ""}
                onAccept={handleColorChange}
              />
            </div>
            <div className="space-x-2 p-4 w-1/3">
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
