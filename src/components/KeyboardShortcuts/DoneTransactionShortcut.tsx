import React, { FC } from "react";

import { useAppContext } from "../../context/AppContext";
import { useKeyPress } from "../../hooks/useKeyPress";
import { updateTransaction } from "../../slices/plansSlice";
import { useAppDispatch } from "../../store";

export const DoneTransactionShortcut: FC = () => {
  const dispatch = useAppDispatch();
  const {
    selectedTransaction,
    setSelectedTransaction,
    selectedPlan,
    isFocused,
  } = useAppContext();
  const [throttle, setThrottle] = React.useState(false);

  const onDoneKeyPressed = (): void => {
    if (!selectedTransaction || isFocused || throttle) {
      return;
    }

    const updatedTransaction = {
      ...selectedTransaction,
      isDone: !selectedTransaction.isDone,
    };

    setThrottle(true);
    setTimeout(() => {
      dispatch(
        updateTransaction({
          planId: selectedPlan?.id ?? "",
          updatedTransaction,
        })
      );
      setSelectedTransaction(updatedTransaction);
    }, 50);

    setTimeout(() => {
      setThrottle(false);
    }, 500);
  };

  const doneKeyPressed = useKeyPress("d");
  if (doneKeyPressed) {
    onDoneKeyPressed();
  }

  return <></>;
};
