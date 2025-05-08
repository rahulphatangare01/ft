import React, { useEffect } from "react";
// import { useBudget } from '../context/BudgetContext';
// import { useTransactions } from "../context/TransactionContext";
import { Edit2, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import "./BudgetList.css";
import { useDispatch, useSelector } from "react-redux";
import { getBudgetCategories } from "../services/budgetCategory/budgetCategory.service";
import { AppDispatch, RootState } from "../store";
import { deleteBudgetCategoryThunk } from "../store/thunk/budget/budget.thunk";
interface BudgetListProps {
  onEdit: (id: string, data: any) => void;
}

const BudgetList: React.FC<BudgetListProps> = ({ onEdit }) => {
  // const { budgets, deleteBudget } = useBudget();
  // const { transactions } = useTransactions();
  // const calculateSpent = (category: string) => {
  //   return transactions
  //     .filter((t) => t.type === "expense" && t.category === category)
  //     .reduce((sum, t) => sum + t.amount, 0);
  // };
  const [tableData, setTableData] = React.useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const budgetCategories = useSelector((state: RootState) => state.budget);

  // const budgets = budgetCategories.budgetCategories;

  const handleDelete = async (id: string, title: string) => {
    const result = await Swal.fire({
      title: `Delete <b>${title}</b>  budget?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      // deleteBudget(id);
      const success = await dispatch(deleteBudgetCategoryThunk(id));
      if (deleteBudgetCategoryThunk.fulfilled.match(success)) {
        console.log("Budget category deleted successfully:", success);
        toast.success("Budget category deleted successfully");
      } else {
        console.error("Error deleting budget category:", success);

        toast.error("Error deleting budget category");
      }
    }
  };

  const updateBudgetCategory = async (data: any) => {
    // console.log(id, "Budget category id to update");
    console.log(data, "Budget category data to update");
  };

  useEffect(() => {
    const fetchBudgetCategories = async () => {
      try {
        const data = await getBudgetCategories();
        // const data = await dispatch(getBudgetCategories());

        // console.log(data.data, "Budget categories fetched successfully");
        setTableData(data?.data);
      } catch (error) {
        console.error("Error fetching budget categories:", error);
      }
    };

    fetchBudgetCategories();
    // dispatch(getBudgetCategoriesThunk());
    // const data = getBudgetCategories();
    // console.log(data, "Budget categories fetched successfully");
    // console.log("One");
  }, [budgetCategories]);

  return (
    <div className="budget-container">
      <div className="table-wrapper">
        <table className="budget-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Budget</th>
              {/* <th>Spent</th> */}
              {/* <th>Remaining</th> */}
              {/* <th>Progress</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((budget: any, index: any) => {
                // const spent = calculateSpent(budget.category);
                // const remaining = budget.amount - spent;
                // const progress = (spent / budget.amount) * 100;

                return (
                  <motion.tr
                    key={budget.id}
                    className="budget-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td>{budget.category}</td>
                    <td className="text-green">${budget.amount.toFixed(2)}</td>
                    {/* <td className="text-red">${spent.toFixed(2)}</td>
                  <td className={remaining >= 0 ? "text-green" : "text-red"}>
                    ${remaining.toFixed(2)}
                  </td> */}
                    {/* <td>
                      <div className="progress-bar-background">
                        <motion.div
                          // className={`progress-bar-fill ${
                          // progress > 100 ? "danger" : "success"
                          // }`}
                          // style={{ width: `${Math.min(progress, 100)}%` }}
                          // data-label={`${progress.toFixed(1)}%`}
                          initial={{ width: 0 }}
                          // animate={{ width: `${Math.min(progress, 100)}%` }}
                          transition={{ duration: 0.6 }}
                        ></motion.div>
                      </div>
                    </td> */}
                    <td>
                      <div className="button-group">
                        <button
                          className="edit-btn"
                          onClick={() => {
                            onEdit(budget.id, budget);
                            updateBudgetCategory(budget);
                            // toast("Editing budget category", { icon: "✏️" });
                          }}
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(budget.id, budget.category)
                          }
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetList;
