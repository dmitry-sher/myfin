import React, { FC, useCallback } from "react";

import { useAppContext } from "../context/AppContext";
import { useKeyPress } from "../hooks/useKeyPress";
import { openModal, setTransactionForRepeat } from "../slices/modalSlice";
import { updateTransaction } from "../slices/plansSlice";
import { useAppDispatch } from "../store";
import { ModalCode } from "../utils/const";

export const KeyboardShortcuts: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedTransaction, setSelectedTransaction, selectedPlan, isFocused } = useAppContext();

  const onRepeatKeyPressed = useCallback(() => {
    if (!selectedTransaction || isFocused) {
      return;
    }

    dispatch(setTransactionForRepeat(selectedTransaction));
    dispatch(openModal(ModalCode.repeatItem));
  }, [selectedTransaction, dispatch, isFocused]);

  const onDoneKeyPressed = useCallback(() => {
    if (!selectedTransaction || isFocused) {
      return;
    }

    const updatedTransaction = {
      ...selectedTransaction,
      isDone: !selectedTransaction.isDone,
    };

    setTimeout(() => {
      dispatch(
        updateTransaction({
          planId: selectedPlan?.id ?? "",
          updatedTransaction,
        })
      );
      setSelectedTransaction(updatedTransaction);
    }, 50);
  }, [selectedTransaction, dispatch, selectedPlan?.id, isFocused, setSelectedTransaction]);

  const repeatKeyPressed = useKeyPress("r");
  if (repeatKeyPressed) {
    onRepeatKeyPressed();
  }

  const doneKeyPressed = useKeyPress("d");
  if (doneKeyPressed) {
    onDoneKeyPressed();
  }

  return <></>;
};
