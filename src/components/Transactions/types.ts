import { RefObject } from "react";

import { Transaction } from "../../types/entities";

export interface TransactionFieldViewerProps {
  transaction: Transaction;
  onClick: () => void;
  isEditing: boolean;
  viewRef: RefObject<HTMLSpanElement>;
}

export interface TransactionFieldEditorProps {
  transaction: Transaction;
  // onClick: () => void;
  onChange: (transaction: Transaction) => void;
  setIsEditing: (isEditing: boolean) => void;
  isEditing: boolean;
  fieldName: keyof Transaction;
  transformer?: (value: string) => string | number;
  initialTransform?: (value: string) => string | number;
  className?: string;
  onTab?: () => void;
}
