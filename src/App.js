// src/App.js
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  // Load transactions from localStorage
  const loadTransactions = () => {
    const storedTransactions = localStorage.getItem("transactions");
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  };

  // State to hold transactions
  const [transactions, setTransactions] = useState(loadTransactions);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Calculate the running balance
  const balance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  // Function to add a new transaction
  const addTransaction = (transaction) => {
    setTransactions((prev) => [{ ...transaction, id: uuidv4() }, ...prev]);
  };

  // Function to update an existing transaction
  const updateTransaction = (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );
  };

  // Function to delete a transaction
  const deleteTransaction = (id) => {
    if (!window.confirm('are you sure?')) return;
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">MyFin</h1>
        <h2 className="text-xl mb-4">
          Current Balance:{" "}
          <span className={balance >= 0 ? "text-green-600" : "text-red-600"}>
            {balance}
          </span>
        </h2>

        {/* Add Transaction Form */}
        <TransactionForm onAddTransaction={addTransaction} />

        <h3 className="text-lg font-semibold mb-2">Transactions</h3>
        <TransactionList
          transactions={transactions}
          onUpdateTransaction={updateTransaction}
          onDeleteTransaction={deleteTransaction}
        />
      </div>
    </div>
  );
}

export default App;
