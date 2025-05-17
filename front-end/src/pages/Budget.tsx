import React, { useState } from "react";
import BudgetForm from "../components/BudgetForm";
import BudgetList from "../components/BudgetList";
import { Plus } from "lucide-react";

const Budget: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState<string | null>(null);

  return (
    <div className="ml-8 pl-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Budget Management</h1>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} className="me-2" />
          Add Budget Category
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <BudgetForm
            onClose={() => {
              setShowForm(false);
              setEditingBudget(null);
            }}
            budgetId={editingBudget}
          />
        </div>
      )}

      <BudgetList
        onEdit={(id) => {
          setEditingBudget(id);
          setShowForm(true);
        }}
      />
    </div>
  );
};

export default Budget;
