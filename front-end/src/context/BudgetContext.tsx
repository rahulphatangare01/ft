import React, { createContext, useContext, useState } from 'react';
import { Budget } from '../types';

interface BudgetContextType {
  budgets: Budget[];
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  updateBudget: (id: string, budget: Omit<Budget, 'id'>) => void;
  deleteBudget: (id: string) => void;
  getBudget: (id: string) => Budget | undefined;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const addBudget = (budget: Omit<Budget, 'id'>) => {
    const newBudget: Budget = {
      ...budget,
      id: Math.random().toString(36).substr(2, 9)
    };
    setBudgets([...budgets, newBudget]);
  };

  const updateBudget = (id: string, budget: Omit<Budget, 'id'>) => {
    setBudgets(budgets.map(b => 
      b.id === id ? { ...budget, id } : b
    ));
  };

  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  const getBudget = (id: string) => {
    return budgets.find(b => b.id === id);
  };

  return (
    <BudgetContext.Provider value={{
      budgets,
      addBudget,
      updateBudget,
      deleteBudget,
      getBudget
    }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};