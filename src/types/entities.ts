export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
}

export interface Plan {
  id: string;
  name: string;
  transactions: Transaction[];
}
