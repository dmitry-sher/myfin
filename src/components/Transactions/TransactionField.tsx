import React, { FC, useState } from "react";

import { Transaction } from "../../types/entities";

import { TransactionEditField } from "./TransactionEditField";
import { TransactionFieldViewerProps } from "./types";

interface TransactionFieldProps {
  viewer: React.FC<TransactionFieldViewerProps>;
  transaction: Transaction;
  onChange: (transaction: Transaction) => void;
  fieldName: keyof Transaction;
  className?: string;
  transformer?: (value: string) => string | number;
  initialTransform?: (value: string) => string | number;
  viewRef: React.RefObject<HTMLSpanElement>;
  onTab?: () => void;
}

export const TransactionField: FC<TransactionFieldProps> = ({
  viewer: Viewer,
  transaction,
  onChange,
  fieldName,
  className,
  transformer,
  initialTransform,
  viewRef,
  onTab,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleChange = (newTransaction: Transaction): void => {
    onChange(newTransaction);
  };

  const handleClick = (): void => {
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <TransactionEditField
        transaction={transaction}
        onChange={handleChange}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        fieldName={fieldName}
        className={className}
        transformer={transformer}
        initialTransform={initialTransform}
        onTab={onTab}
      />
    );
  }

  return (
    <Viewer
      transaction={transaction}
      onClick={handleClick}
      isEditing={isEditing}
      viewRef={viewRef}
    />
  );
};
