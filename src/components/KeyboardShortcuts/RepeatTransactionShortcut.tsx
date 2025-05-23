import React, { FC } from "react";

import { useAppContext } from "../../context/AppContext";
import { useKeyPress } from "../../hooks/useKeyPress";
import { openModal, setTransactionForRepeat } from "../../slices/modalSlice";
import { useAppDispatch } from "../../store";
import { ModalCode } from "../../utils/const";

export const RepeatTransactionShortcut: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedTransaction, isFocused } = useAppContext();

  const onRepeatKeyPressed = (): void => {
    if (!selectedTransaction || isFocused) {
      return;
    }

    dispatch(setTransactionForRepeat(selectedTransaction));
    dispatch(openModal(ModalCode.repeatItem));
  };

  const repeatKeyPressed = useKeyPress("r");
  if (repeatKeyPressed) {
    onRepeatKeyPressed();
  }

  return <></>;
};
