import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppSettingsState {
  isHeaderSticky: boolean;
}

const initialState: AppSettingsState = {
  isHeaderSticky: true,
};

const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setIsHeaderSticky(state, action: PayloadAction<boolean>) {
      state.isHeaderSticky = action.payload;
    },
    toggleIsHeaderSticky(state) {
      state.isHeaderSticky = !state.isHeaderSticky;
    },
  },
});

export const { setIsHeaderSticky, toggleIsHeaderSticky } =
  appSettingsSlice.actions;

export default appSettingsSlice.reducer;
