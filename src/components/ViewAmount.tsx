import React, { FC } from "react";

import { printAmount } from "../utils/printAmount";

type ViewAmountProps = {
    className?: string;
    balancePlan: number;
    balanceFact: number;
    showPlanFact: boolean;
    label: string;
}

export const ViewAmount: FC<ViewAmountProps> = ({
  className,
  balancePlan,
  balanceFact,
  showPlanFact,
  label
}) => {
  return (
    <span className={className}>
      {label}: {printAmount(balancePlan)}
      {showPlanFact ? ` / ${printAmount(balanceFact)}` : ""}
    </span>
  );
};
