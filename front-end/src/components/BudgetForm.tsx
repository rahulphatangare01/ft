import React, { useState, useEffect } from "react";
import { Budget } from "../types";
import toast from "react-hot-toast";
import "./BudgetForm.css";
import {
  addBudgetCategoryThunk,
  updateBudgetCategoryThunk,
} from "../store/thunk/budget/budget.thunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getBudgetCategoryById } from "../services/budgetCategory/budgetCategory.service";
interface BudgetFormProps {
  onClose: () => void;
  budgetId?: string | null;
  updateBudgetData?: (data: any) => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ onClose, budgetId }) => {
  const [formData, setFormData] = useState<Budget>({
    category: "",
    amount: 0,
  });
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchBudgetData = async () => {
      if (budgetId) {
        try {
          const budget = await getBudgetCategoryById(budgetId);
          if (budget) {
            
            setFormData({
              category: budget?.data?.category,
              amount: budget?.data?.amount,
            });
          }
        } catch (error) {
          console.error("Error fetching budget data:", error);
        }
      }
    };
    fetchBudgetData();
  }, [budgetId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (budgetId) {
      const payload = {
        id: budgetId,
        category: formData.category,
        amount: formData.amount,
      };
      try {
        const success = await dispatch(updateBudgetCategoryThunk(payload));
        if (updateBudgetCategoryThunk.fulfilled.match(success)) {
          toast.success("Budget category updated successfully");
        }
      } catch (error) {
        toast.error("Error updating budget category");
      }
      onClose();
    } else {
      const success = await dispatch(addBudgetCategoryThunk(formData));
      if (addBudgetCategoryThunk.fulfilled.match(success)) {
        toast.success("Budget category added successfully");
      }
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <h2 className="modal-title">
          {budgetId ? "Edit Budget Category" : "Add Budget Category"}
        </h2>
        <p className="modal-description">
          Fill in the fields below to manage your budget.
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: parseFloat(e.target.value) })
              }
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              {budgetId ? "Update" : "Add"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;
