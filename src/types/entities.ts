// Define the type for a Transaction
export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
}

// Define the type for a Plan
export interface Plan {
  id: string;
  name: string;
  transactions: Transaction[];
}
