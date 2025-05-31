import { createContext, useContext } from "react";

import { OptionType, Plan, Transaction } from "../types/entities";

export interface AppContextType {
  selectedPlan: Plan | null | undefined;
  setSelectedPlanId: (planId: string | null) => void;
  selectedTransaction: Transaction | null | undefined;
  setSelectedTransaction: (transaction: Transaction | null) => void;
  isHeaderSticky: boolean;
  setIsHeaderSticky: (isSticky: boolean) => void;
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
  categoriesFilter: OptionType[] | null;
  setCategoriesFilter: (isFocused: OptionType[] | null) => void;
  isHeaderExpanded: boolean;
  setIsHeaderExpanded: (isExpanded: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
  selectedPlan: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedPlanId: () => {},

  selectedTransaction: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedTransaction: () => {},

  isHeaderSticky: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsHeaderSticky: () => {},

  isFocused: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsFocused: () => {},

  categoriesFilter: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCategoriesFilter: () => {},

  isHeaderExpanded: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsHeaderExpanded: () => {},
});

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext not found");
  return context;
};
