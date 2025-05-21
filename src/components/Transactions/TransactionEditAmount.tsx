import React, { FC, useEffect, useState } from "react";

import { TransactionFieldEditorProps } from "./types";

export const TransactionEditAmount: FC<TransactionFieldEditorProps> = ({
  transaction,
  onChange,
  isEditing,
  setIsEditing,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(transaction.amount);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(Number(event.target.value));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.keyCode === 13) {
      // Enter key pressed
      setIsEditing(false);
      const updatedTransaction = {
        ...transaction,
        amount: value,
      };
      onChange(updatedTransaction);
      return;
    }

    if (event.keyCode === 27) {
      // Escape key pressed
      setIsEditing(false);
      return;
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <span className="w-4/5">
      <input
        type="text"
        ref={inputRef}
        className="w-full"
        value={value}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
    </span>
  );
};
