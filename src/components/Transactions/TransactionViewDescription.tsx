import React, { FC } from "react";

import { TransactionFieldViewerProps } from "./types";

export const TransactionViewDescription: FC<TransactionFieldViewerProps> = ({
  transaction,
  onClick,
  viewRef,
}) => {
  return (
    <span className="w-4/5 cursor-pointer" onClick={onClick} ref={viewRef}>
      {transaction.description}
    </span>
  );
};
