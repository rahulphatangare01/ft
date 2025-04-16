import React, { useState, useEffect } from 'react';
import { useBudget } from '../context/BudgetContext';
import { Budget } from '../types';
import toast from 'react-hot-toast';

interface BudgetFormProps {
  onClose: () => void;
  budgetId?: string | null;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ onClose, budgetId }) => {
  const { addBudget, updateBudget, getBudget } = useBudget();
  const [formData, setFormData] = useState<Omit<Budget, 'id'>>({
    category: '',
    amount: 0
  });

  useEffect(() => {
    if (budgetId) {
      const budget = getBudget(budgetId);
      if (budget) {
        setFormData({
          category: budget.category,
          amount: budget.amount
        });
      }
    }
  }, [budgetId, getBudget]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (budgetId) {
      updateBudget(budgetId, formData);
      toast.success('Budget category updated successfully');
    } else {
      addBudget(formData);
      toast.success('Budget category added successfully');
    }
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        {budgetId ? 'Edit Budget Category' : 'Add Budget Category'}
      </h2>
      <form onSubmit={handleSubmit} className="animate-fade-in">
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="d-flex gap-2">
          <button 
            type="submit" 
            className="btn btn-primary hover:bg-primary-dark transition-colors"
          >
            {budgetId ? 'Update' : 'Add'} Budget
          </button>
          <button 
            type="button" 
            className="btn btn-secondary hover:bg-gray-600 transition-colors" 
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm;