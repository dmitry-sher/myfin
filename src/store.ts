import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./slices/appStateSlice";
import categoriesReducer from "./slices/categoriesSlice";
import modalReducer from "./slices/modalSlice";
import plansReducer from "./slices/plansSlice";
import { saveStore } from "./utils/saveStore";

export const store = configureStore({
  reducer: {
    plans: plansReducer,
    categories: categoriesReducer,
    modal: modalReducer,
    appState: appStateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.subscribe(() => {
  saveStore(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
