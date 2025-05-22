import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Plan } from "../types/entities";

interface AppStateState {
  isHeaderSticky: boolean;
  selectedPlan: Plan | null;
}

const initialState: AppStateState = {
  isHeaderSticky: true,
  selectedPlan: null,
};

const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setIsHeaderSticky(state, action: PayloadAction<boolean>) {
      state.isHeaderSticky = action.payload;
    },
    toggleIsHeaderSticky(state) {
      state.isHeaderSticky = !state.isHeaderSticky;
    },
    setSelectedPlan(state, action: PayloadAction<Plan | null>) {
      state.selectedPlan = action.payload;
    },
  },
});

export const {
  setIsHeaderSticky,
  setSelectedPlan,
  toggleIsHeaderSticky,
} = appStateSlice.actions;

export default appStateSlice.reducer;
