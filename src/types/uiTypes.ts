import { RefObject } from "react";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

import { Transaction } from "./entities";

export interface TransactionFieldViewerProps {
  transaction: Transaction;
  onClick: () => void;
  isEditing: boolean;
  viewRef: RefObject<HTMLSpanElement>;
}

export interface TransactionFieldEditorProps {
  transaction: Transaction;
  onChange: (transaction: Transaction) => void;
  setIsEditing: (isEditing: boolean) => void;
  isEditing: boolean;
  fieldName: keyof Transaction;
  transformer?: (value: string) => string | number;
  initialTransform?: (value: string) => string | number;
  className?: string;
  onTab?: () => void;
}

export interface IconButtonProps {
  size?: SizeProp;
}
