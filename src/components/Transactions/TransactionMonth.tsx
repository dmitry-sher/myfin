import React, { FC, useEffect, useRef, useState } from "react";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addMonths, isBefore, parse } from "date-fns";

import { MonthTotalsContext } from "../../context/MonthTotalsContext";
import { useMonthTotals } from "../../hooks/useMonthTotals";
import { Transaction } from "../../types/entities";
import { monthKeyFormat } from "../../utils/const";

import { TransactionMonthFooter } from "./TransactionMonthFooter";
import { ViewTransaction } from "./ViewTransaction";

interface TransactionMonthProps {
  monthKey: string;
  monthTransactions: Transaction[];
  onUpdateTransaction: (updatedTransaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
  startingRunningBalance: number;
  isCurrentMonth?: boolean;
}

export const TransactionMonth: FC<TransactionMonthProps> = ({
  monthKey,
  monthTransactions,
  onUpdateTransaction,
  onDeleteTransaction,
  startingRunningBalance,
  isCurrentMonth = false,
}) => {
  const {
    monthlyInTotalPlan,
    monthlyOutTotalPlan,
    monthlyInTotalFact,
    monthlyOutTotalFact,
    monthBalance,
    monthBalanceFact,
    transactionsBalances,
  } = useMonthTotals({ monthTransactions, startingRunningBalance });

  const isAllDone = monthTransactions.reduce(
    (acc, next) => acc && next.isDone,
    true
  );
  const isNoneDone = !monthTransactions.reduce(
    (acc, next) => acc || next.isDone,
    false
  );
  const showPlanFact = !(isAllDone || isNoneDone);
  const endOfMonth = addMonths(parse(monthKey, monthKeyFormat, new Date()), 1);
  const now = new Date();
  const isOldMonth = isBefore(endOfMonth, now);
  const [opened, setOpened] = useState(!isOldMonth);

  const monthRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isCurrentMonth && monthRef.current) {
      monthRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isCurrentMonth]);

  const divRef = isCurrentMonth ? monthRef : null;
  const icon = opened ? faChevronDown : faChevronRight;
  const bodyWrapperClass = opened ? "block" : "hidden";

  return (
    <MonthTotalsContext.Provider
      value={{
        monthTransactions,
        startingBalance: startingRunningBalance,
        monthKey,
      }}
    >
      <div key={monthKey} id={`month-${monthKey}`} ref={divRef}>
        <div
          className="p-2 border-b relative cursor-pointer"
          onClick={() => setOpened(!opened)}
        >
          <FontAwesomeIcon
            icon={icon}
            className="sm:block absolute top-3 left-2"
          />
          <div className="text-center font-semibold">{monthKey}</div>
        </div>
        <div className={bodyWrapperClass}>
          {monthTransactions.map((transaction) => (
            <ViewTransaction
              key={transaction.id}
              transaction={transaction}
              onUpdateTransaction={onUpdateTransaction}
              onDeleteTransaction={onDeleteTransaction}
              balance={transactionsBalances[transaction.id]}
            />
          ))}
          <TransactionMonthFooter
            monthKey={monthKey}
            monthlyInTotalPlan={monthlyInTotalPlan}
            monthlyOutTotalPlan={monthlyOutTotalPlan}
            monthlyInTotalFact={monthlyInTotalFact}
            monthlyOutTotalFact={monthlyOutTotalFact}
            monthBalance={monthBalance}
            monthBalanceFact={monthBalanceFact}
            showPlanFact={showPlanFact}
          />
        </div>
      </div>
    </MonthTotalsContext.Provider>
  );
};
