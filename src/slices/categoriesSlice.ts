import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Category } from "../types/entities";
import { loadAndPrepareCategories } from "../utils/loadAndPrepareCategories";

const initialState: Category[] = loadAndPrepareCategories();

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (
      state,
      action: PayloadAction<Category>
    ) => {
      const { name } = action.payload;
      if (state.some((category) => category.name === name)) {
        return;
      }
      const newState = [...state, action.payload];
      newState.sort((a, b) => a.name.localeCompare(b.name));
      state.splice(0, state.length, ...newState);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      const categoryId = action.payload;
      const categoryIndex = state.findIndex((category) => category.id === categoryId);

      if (categoryIndex !== -1) {
        state.splice(categoryIndex, 1);
      }
    },
  }
});

export const {
  addCategory,
  removeCategory
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
