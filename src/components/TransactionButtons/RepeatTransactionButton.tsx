import React, { FC } from "react";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { openModal, setTransactionForRepeat } from "../../slices/modalSlice";
import { useAppDispatch } from "../../store";
import { Transaction } from "../../types/entities";
import { ModalCode } from "../../utils/const";

interface RepeatTransactionButtonProps {
  transaction: Transaction;
}

export const RepeatTransactionButton: FC<RepeatTransactionButtonProps> = ({ transaction }) => {
  const dispatch = useAppDispatch();

  const handleRepeat = (): void => {
    dispatch(setTransactionForRepeat(transaction));
    dispatch(openModal(ModalCode.repeatItem));
  };

  return (
    <button
      onClick={handleRepeat}
      className="p-1 bg-green-500 text-white rounded"
    >
      <FontAwesomeIcon icon={faRepeat} />
    </button>
  );
};
