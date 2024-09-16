import React, { useState, ChangeEvent, FormEvent, FC } from "react";

export interface NewTransaction {
  amount: number;
  description: string;
  date: string;
}

interface TransactionFormProps {
  onAddTransaction: (transaction: NewTransaction) => void;
}

interface FormState {
  amount: string;
  description: string;
  date: string;
}

export const TransactionForm: FC<TransactionFormProps> = ({
  onAddTransaction,
}) => {
  const [formState, setFormState] = useState<FormState>({
    amount: "",
    description: "",
    date: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { amount, description, date } = formState;

    const numericAmount = parseFloat(amount);

    if (!numericAmount || !description || !date) {
      alert("Please fill out all fields correctly.");
      return;
    }

    onAddTransaction({ amount: numericAmount, description, date });

    setFormState({ amount: "", description: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex space-x-2">
      <input
        type="text"
        name="amount"
        value={formState.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-1/4 p-2 border rounded"
      />
      <input
        type="text"
        name="description"
        value={formState.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-1/2 p-2 border rounded"
      />
      <input
        type="text"
        name="date"
        value={formState.date}
        onChange={handleChange}
        placeholder="Date (dd/mm)"
        className="w-1/4 p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Add
      </button>
    </form>
  );
};

export default TransactionForm;