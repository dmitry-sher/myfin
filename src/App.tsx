import React, { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { AppLayout } from "./components/AppLayout";
import { AppModals } from "./components/AppModals";
import { KeyboardShortcuts } from "./components/KeyboardShortcuts/KeyboardShortcuts";
import { AppContext } from "./context/AppContext";
import { CategoryLabelMapProvider } from "./context/CategoryLabelMapContext";
import { addPlan } from "./slices/plansSlice";
import { Transaction } from "./types/entities";
import { findAndSelectPlan } from "./utils/findAndSelectPlan";
import { saveStore } from "./utils/saveStore";
import { store, useAppDispatch, useAppSelector } from "./store";

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const plans = useAppSelector((state) => state.plans);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isHeaderSticky, setIsHeaderSticky] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    React.useState<Transaction | null>(null);
  const categories = useAppSelector((state) => state.categories);
  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

  useEffect(() => {
    saveStore(store.getState());
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && hash !== selectedPlan?.id) {
      findAndSelectPlan(setSelectedPlanId, hash);
    }

    if (!plans || plans.length === 0) {
      const newPlanId = uuidv4();
      const newPlan = { newPlanName: "My First plan", newPlanId };
      dispatch(addPlan(newPlan));
      setTimeout(() => {
        findAndSelectPlan(setSelectedPlanId, newPlanId);
      }, 250);
    }
  }, [plans, dispatch, selectedPlan]);

  return (
    <CategoryLabelMapProvider categories={categories}>
      <AppContext.Provider
        value={{
          selectedPlan,
          setSelectedPlanId,
          selectedTransaction,
          setSelectedTransaction,
          isHeaderSticky,
          setIsHeaderSticky,
          isFocused,
          setIsFocused,
        }}
      >
        <AppLayout />
        <AppModals />
        <KeyboardShortcuts />
      </AppContext.Provider>
    </CategoryLabelMapProvider>
  );
};
