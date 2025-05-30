import React, { FC } from "react";

import { TransactionFieldViewerProps } from "../../types/uiTypes";

export const TransactionViewAmount: FC<TransactionFieldViewerProps> = ({
  transaction,
  onClick,
  viewRef,
}) => {
  return (
    <span
      className={`w-1/4 cursor-text sm:text-right ${
        transaction.amount > 0 ? "text-green-600" : "text-red-600"
      }`}
      onClick={onClick}
      ref={viewRef}
    >
      {transaction.amount > 0 ? "+" : ""}
      {transaction.amount}
    </span>
  );
};
