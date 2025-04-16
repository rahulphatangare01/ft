import React from 'react';
import { useBudget } from '../context/BudgetContext';
import { useTransactions } from '../context/TransactionContext';
import { Edit2, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

interface BudgetListProps {
  onEdit: (id: string) => void;
}

const BudgetList: React.FC<BudgetListProps> = ({ onEdit }) => {
  const { budgets, deleteBudget } = useBudget();
  const { transactions } = useTransactions();

  const calculateSpent = (category: string) => {
    return transactions
      .filter(t => t.type === 'expense' && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const handleDelete = async (id: string) => {
    // const result = await Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!',
    //   background: '#fff',
    //   customClass: {
    //     container: 'rounded-lg',
    //     popup: 'rounded-lg',
    //     header: 'border-b pb-3',
    //     title: 'text-xl font-semibold',
    //     content: 'py-3',
    //     actions: 'border-t pt-3'
    //   }
    // });

    // if (result.isConfirmed) {
    //   deleteBudget(id);
    //   toast.success('Budget category deleted successfully');
    // }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th>Category</th>
              <th>Budget Amount</th>
              <th>Spent</th>
              <th>Remaining</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map(budget => {
              const spent = calculateSpent(budget.category);
              const remaining = budget.amount - spent;
              const progress = (spent / budget.amount) * 100;

              return (
                <tr key={budget.id} className="hover:bg-gray-50 transition-colors">
                  <td>{budget.category}</td>
                  <td>${budget.amount.toFixed(2)}</td>
                  <td>${spent.toFixed(2)}</td>
                  <td className={remaining >= 0 ? 'text-success' : 'text-danger'}>
                    ${remaining.toFixed(2)}
                  </td>
                  <td>
                    <div className="progress" style={{ height: '20px' }}>
                      <div
                        className={`progress-bar ${progress > 100 ? 'bg-danger' : 'bg-success'}`}
                        role="progressbar"
                        style={{ 
                          width: `${Math.min(progress, 100)}%`,
                          transition: 'width 0.5s ease-in-out'
                        }}
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        {progress.toFixed(1)}%
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary hover:bg-primary hover:text-white transition-colors"
                        onClick={() => {
                          onEdit(budget.id);
                          toast.success('Editing budget category');
                        }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger hover:bg-danger hover:text-white transition-colors"
                        onClick={() => handleDelete(budget.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetList;