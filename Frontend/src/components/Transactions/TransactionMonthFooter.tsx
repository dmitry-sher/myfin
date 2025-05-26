import React, { FC } from "react";

import { ViewMonthGraphsButton } from "../Analytics/ViewMonthGraphsButton";
import { ViewPieChartButton } from "../Analytics/ViewPieChartButton";
import { ViewTotalsButton } from "../Analytics/ViewTotalsButton";
import { ViewAmount } from "../ViewAmount";

interface TransactionMonthFooterProps {
  monthKey: string;
  monthlyInTotalPlan: number;
  monthlyOutTotalPlan: number;
  monthlyInTotalFact: number;
  monthlyOutTotalFact: number;
  monthBalance: number;
  monthBalanceFact: number;
  showPlanFact: boolean;
}

export const TransactionMonthFooter: FC<TransactionMonthFooterProps> = ({
  monthKey,
  monthlyInTotalPlan,
  monthlyOutTotalPlan,
  monthlyInTotalFact,
  monthlyOutTotalFact,
  monthBalance,
  monthBalanceFact,
  showPlanFact,
}) => (
  <div className="flex flex-col sm:flex-row justify-between font-semibold p-2 mb-6">
    <div className="sm:w-1/5 w-full flex">
      <span className="hidden sm:flex sm:w-1/2 w-1/5 print:hidden">
        <ViewTotalsButton />
        <ViewPieChartButton />
        <ViewMonthGraphsButton />
      </span>
      <span className="sm:w-1/2 w-full text-center">
        <span className="print:hidden">{monthKey}</span> Totals
      </span>
    </div>
    <div className="sm:w-4/5 w-full flex">
      <ViewAmount
        className="w-1/3 sm:text-right"
        balancePlan={monthlyInTotalPlan}
        balanceFact={monthlyInTotalFact}
        showPlanFact={showPlanFact}
        label="In"
      />
      <ViewAmount
        className="w-1/3 text-right"
        balancePlan={monthlyOutTotalPlan}
        balanceFact={monthlyOutTotalFact}
        showPlanFact={showPlanFact}
        label="Out"
      />
      <ViewAmount
        className="w-1/3 text-right"
        balancePlan={monthBalance}
        balanceFact={monthBalanceFact}
        showPlanFact={showPlanFact}
        label="Balance"
      />
    </div>
  </div>
);
