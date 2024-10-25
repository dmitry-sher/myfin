export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  isDone: boolean;
  trueDate: Date;
}

export interface SavedTransaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  isDone: boolean;
  trueDate: string;
}

export interface Plan {
  id: string;
  name: string;
  transactions: Transaction[];
}

export interface SavedPlan {
  id: string;
  name: string;
  transactions: SavedTransaction[];
}
