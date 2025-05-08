export interface User {
  email: string;
  name?: string;
  mobileNo?: string;
}

export interface Transaction {
  // id: string;
  // type: "income" | "expense";
  type: string;
  amount: number;
  // category: string;
  categoryId: string;
  description: string;
  date: string;
}

export interface Budget {
  category: string;
  amount: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}
