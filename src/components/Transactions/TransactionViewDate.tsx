import React, { FC } from "react";

import { printDate } from "../../utils/printDate";

import { TransactionFieldViewerProps } from "./types";

export const TransactionViewDate: FC<TransactionFieldViewerProps> = ({
  transaction,
  onClick,
  viewRef,
}) => {
  return (
    <span className="w-1/5 cursor-pointer" onClick={onClick} ref={viewRef}>
      {printDate(transaction)}
    </span>
  );
};
