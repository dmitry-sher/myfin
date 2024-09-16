import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { Transaction } from "./types/transaction";

function App() {
  const loadTransactions = (): Transaction[] => {
    const storedTransactions = localStorage.getItem("transactions");
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  };

  const [transactions, setTransactions] =
    useState<Transaction[]>(loadTransactions);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const balance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    setTransactions((prev) => [{ ...transaction, id: uuidv4() }, ...prev]);
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );
  };

  const deleteTransaction = (id: string) => {
    if (!window.confirm("Are you sure?")) return;
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
