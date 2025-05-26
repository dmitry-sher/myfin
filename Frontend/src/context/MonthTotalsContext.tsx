import { createContext, useContext } from "react";

import { Transaction } from "../types/entities";

export interface MonthTotalsContextType {
  monthTransactions: Transaction[];
  startingBalance: number;
  monthKey: string;
}

export const MonthTotalsContext = createContext<
  MonthTotalsContextType | undefined
>(undefined);

export const useMonthTotalsContext = (): MonthTotalsContextType => {
  const context = useContext(MonthTotalsContext);
  if (!context) throw new Error("MonthTotalsContext not found");
  return context;
};
