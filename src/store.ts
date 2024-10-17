import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./slices/modalSlice";
import plansReducer from "./slices/plansSlice";

export const saveState = (state: RootState["plans"]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("plans", serializedState);
  }
  catch (err) {
    console.error("Could not save state", err);
  }
};

export const store = configureStore({
  reducer: {
    plans: plansReducer,
    modal: modalReducer
  }
});

store.subscribe(() => {
  saveState(store.getState().plans);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
