import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { useAppContext } from "../../context/AppContext";
import { TransactionFieldEditorProps } from "../../types/uiTypes";

export const TransactionEditField: FC<TransactionFieldEditorProps> = ({
  transaction,
  onChange,
  isEditing,
  setIsEditing,
  fieldName,
  transformer = (value: string): string => value,
  initialTransform = (value: string): string => value,
  className,
  onTab,
}) => {
  const { setIsFocused } = useAppContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(
    initialTransform(transaction[fieldName] as string)
  );
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(transformer(event.target.value));
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.keyCode === 13) {
      // Enter key pressed
      setIsEditing(false);
      const updatedTransaction = {
        ...transaction,
        [fieldName]: value,
      };
      onChange(updatedTransaction);
      setIsFocused(false);
      return;
    }

    if (event.keyCode === 27) {
      // Escape key pressed
      setIsEditing(false);
      setIsFocused(false);
      return;
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.keyCode === 9) {
      // Tab key pressed
      setIsEditing(false);
      setIsFocused(false);
      const updatedTransaction = {
        ...transaction,
        [fieldName]: value,
      };
      onChange(updatedTransaction);
      onTab?.();
      return;
    }
  };

  const handleBlur = (): void => {
    setIsEditing(false);
    setIsFocused(false);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  }, [isEditing, setIsFocused]);

  return (
    <span className={className}>
      <input
        type="text"
        ref={inputRef}
        className="w-full"
        value={value as string}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    </span>
  );
};
