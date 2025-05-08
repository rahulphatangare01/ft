// import React, { createContext, useContext, useState } from 'react';
// import { Transaction } from '../types';

// interface TransactionContextType {
//   transactions: Transaction[];
//   addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
//   updateTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => void;
//   deleteTransaction: (id: string) => void;
//   getTransaction: (id: string) => Transaction | undefined;
// }

// const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);

//   const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
//     const newTransaction: Transaction = {
//       ...transaction,
//       id: Math.random().toString(36).substr(2, 9)
//     };
//     setTransactions([...transactions, newTransaction]);
//   };

//   const updateTransaction = (id: string, transaction: Omit<Transaction, 'id'>) => {
//     setTransactions(transactions.map(t =>
//       t.id === id ? { ...transaction, id } : t
//     ));
//   };

//   const deleteTransaction = (id: string) => {
//     setTransactions(transactions.filter(t => t.id !== id));
//   };

//   const getTransaction = (id: string) => {
//     return transactions.find(t => t.id === id);
//   };

//   return (
//     <TransactionContext.Provider value={{
//       transactions,
//       addTransaction,
//       updateTransaction,
//       deleteTransaction,
//       getTransaction
//     }}>
//       {children}
//     </TransactionContext.Provider>
//   );
// };

// export const useTransactions = () => {
//   const context = useContext(TransactionContext);
//   if (context === undefined) {
//     throw new Error('useTransactions must be used within a TransactionProvider');
//   }
//   return context;
// };
