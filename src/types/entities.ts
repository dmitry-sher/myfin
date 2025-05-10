export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  isDone: boolean;
  trueDate: Date;
  categoryId?: string;
}

export interface Category {
  id: string;
  name: string;
  color?: string;
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
  isDefault?: boolean;
}

export interface SavedPlan {
  id: string;
  name: string;
  transactions: SavedTransaction[];
}

export type OptionType = {
  value: string;
  label: string;
  color?: string;
};
