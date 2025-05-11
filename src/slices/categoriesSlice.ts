import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Category } from "../types/entities";
import { loadAndPrepareCategories } from "../utils/loadAndPrepareCategories";
import { sortCategories } from "../utils/sortCategories";

const initialState: Category[] = loadAndPrepareCategories();

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      const { name } = action.payload;
      if (state.some((category) => category.name === name)) {
        return;
      }
      const newState = [...state, action.payload];
      newState.sort(sortCategories);
      state.splice(0, state.length, ...newState);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      const categoryId = action.payload;
      const categoryIndex = state.findIndex(
        (category) => category.id === categoryId
      );

      if (categoryIndex !== -1) {
        state.splice(categoryIndex, 1);
      }
    },
    updateColor: (
      state,
      action: PayloadAction<{ id: string; color: string }>
    ) => {
      const { id, color } = action.payload;
      const existingCategory = state.find((category) => category.id === id);
      if (existingCategory) {
        existingCategory.color = color;
      }
    },
  },
});

export const { addCategory, removeCategory, updateColor } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
