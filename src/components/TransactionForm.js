import React, { useState } from "react";

function TransactionForm({ onAddTransaction }) {
  const [formState, setFormState] = useState({
    amount: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
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
}

export default TransactionForm;
