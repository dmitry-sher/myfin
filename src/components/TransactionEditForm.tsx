import React, { useState, ChangeEvent, FC } from "react";
import { Transaction } from "../types/entities";

interface TransactionEditFormProps {
  transaction: Transaction;
  onSave: (updatedTransaction: Transaction) => void;
  onCancel: () => void;
}

export const TransactionEditForm: FC<TransactionEditFormProps> = ({
  transaction,
  onSave,
  onCancel,
}) => {
  const [editState, setEditState] = useState<Transaction>({ ...transaction });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const { amount, description, date } = editState;
    const numericAmount = parseFloat(amount.toString());

    if (!numericAmount || !description || !date) {
      alert("Please fill out all fields correctly.");
      return;
    }

    onSave({ ...editState, amount: numericAmount });
  };

  return (
    <div className="flex justify-between items-center">
      <input
        type="text"
        name="date"
        value={editState.date}
        onChange={handleChange}
        className="w-1/4 p-1 border rounded"
      />
      <input
        type="text"
        name="description"
        value={editState.description}
        onChange={handleChange}
        className="w-1/4 p-1 border rounded"
      />
      <input
        type="text"
        name="amount"
        value={editState.amount.toString()}
        onChange={handleChange}
        className="w-1/4 p-1 border rounded"
      />
      <button
        onClick={handleSave}
        className="p-1 bg-green-500 text-white rounded"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className="ml-2 p-1 bg-gray-500 text-white rounded"
      >
        Cancel
      </button>
    </div>
  );
};

export default TransactionEditForm;
