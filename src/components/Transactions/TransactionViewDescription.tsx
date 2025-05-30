import React, { FC } from "react";

import { TransactionFieldViewerProps } from "../../types/uiTypes";

export const TransactionViewDescription: FC<TransactionFieldViewerProps> = ({
  transaction,
  onClick,
  viewRef,
}) => {
  return (
    <span className="w-4/5 cursor-text" onClick={onClick} ref={viewRef}>
      {transaction.description}
    </span>
  );
};
