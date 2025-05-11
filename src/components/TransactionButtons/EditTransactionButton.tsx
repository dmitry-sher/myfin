import React, { FC } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface EditTransactionButtonProps {
  setIsEditing: (arg: boolean) => void;
}

export const EditTransactionButton: FC<EditTransactionButtonProps> = ({ setIsEditing }) => {
  const handleEdit = (): void => setIsEditing(true);

  return (
    <button onClick={handleEdit} className="p-1 bg-blue-500 text-white rounded">
      <FontAwesomeIcon icon={faEdit} />
    </button>
  );
};
