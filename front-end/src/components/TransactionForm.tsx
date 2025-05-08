import React, { useState, useEffect } from "react";
// import { useTransactions } from '../context/TransactionContext';
import { Transaction } from "../types";
import toast from "react-hot-toast";
import "./TransactionForm.css"; // Make sure this CSS file exists
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getBudgetCategories } from "../services/budgetCategory/budgetCategory.service";
import {
  addTransactionThunk,
  updateTransactionThunk,
} from "../store/thunk/transaction/transaction.thunk";

interface TransactionFormProps {
  onClose: () => void;
  transactionId?: string | null;
  transactionData?: any;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onClose,
  transactionId,
  transactionData,
}) => {
  // const { addTransaction, updateTransaction, getTransaction } = useTransactions();
  // const getTransaction = "";
  // const [formData, setFormData] = useState<Omit<Transaction, "id">>({
  //   type: "expense",
  //   amount: 0,
  //   category: "",
  //   description: "",
  //   date: new Date().toISOString().split("T")[0],
  // });
  const [formData, setFormData] = useState<Transaction>({
    type: "",
    amount: 0,
    categoryId: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const budgetCategories = useSelector((state: RootState) => state.budget);
  const [budgetOption, setBudgetOption] = React.useState<any[]>([]);
  const [tableData, setTableData] = React.useState<any[]>([]);

  const transactionType = [
    "income",
    "expense",
    "investment",
    "savings",
    "loan",
    "other",
  ];

  const dispatch = useDispatch<AppDispatch>();
  // console.log(budgetOption, "budgetOption");
  useEffect(() => {
    // if (transactionId) {
    // const transaction = getTransaction(transactionId);
    // if (transaction) {
    //   setFormData({
    //     type: transaction.type,
    //     amount: transaction.amount,
    //     category: transaction.category,
    //     description: transaction.description,
    //     date: transaction.date.split("T")[0],
    //   });
    // }
    // }
    // }, [transactionId, getTransaction]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (transactionId) {
      // updateTransaction(transactionId, formData);
      const payload = {
        id: transactionId,
        type: formData.type,
        amount: formData.amount,
        categoryId: formData.categoryId,
        description: formData.description,
        date: formData.date,
      };
      try {
        const success = await dispatch(updateTransactionThunk(payload));
        if (updateTransactionThunk.fulfilled.match(success)) {
          toast.success("Transaction updated successfully");
        }
      } catch (error) {
        console.error("Error updating transaction:", error);
        toast.error("Error updating transaction");
      }
    } else {
      // addTransaction(formData);
      try {
        // console.log("Formdata", formData);
        const success = await dispatch(addTransactionThunk(formData));
        if (addTransactionThunk.fulfilled.match(success)) {
          toast.success("Transaction updated successfully");
        }
      } catch (error) {
        console.error("Error i Creating transaction:", error);
        toast.error("Error creating transaction");
      }
      // console.log(formData, "FormData- transaction add");
      // toast.success("Transaction added successfully");
    }
    onClose();
  };
  useEffect(() => {
    const fetchBudgetCategories = async () => {
      try {
        const data = await getBudgetCategories();

        if (data.data.length > 0) {
          let category = [];
          setTableData(data.data);
          // console.log("data.data", data.data);
          data?.data?.map((item: any) => {
            category.push(item.category);
            // console.log(category, "item in map");
            setBudgetOption(category);
          });
        }
      } catch (error) {
        console.error("Error fetching budget categories:", error);
      }
    };

    fetchBudgetCategories();
  }, [budgetCategories]);

  useEffect(() => {
    console.log("transactionData: ", transactionData);
    if (transactionData) {
      setFormData({
        type: transactionData?.type,
        amount: transactionData?.amount,
        categoryId: transactionData?.categoryId,
        description: transactionData?.description,
        // date: new Date().toISOString().split("T")[0],
        date: transactionData?.date,
      });
    }
  }, [transactionData]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">
          {transactionId ? "Edit Transaction" : "Add Transaction"}
        </h2>
        <p className="modal-subtitle">Fill in the details below</p>
        <form onSubmit={handleSubmit}>
          {/* <div className="form-group">
            <label>Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as "income" | "expense",
                })
              }
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div> */}
          <div className="form-group">
            <label>Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value, // ✅ No need to manually set the type here
                })
              }
              required
            >
              <option value="" disabled>
                Select Type
              </option>
              {transactionType.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: parseFloat(e.target.value) })
              }
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            />
          </div> */}
          <div className="form-group">
            <label>Category</label>
            <select
              value={
                tableData.find((data) => data?.id === formData?.categoryId)
                  ?.category || ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  categoryId:
                    tableData.find((data) => data.category === e.target.value)
                      ?.id || "", // ✅ No need to manually set the type here
                })
              }
              required
            >
              <option value="" disabled>
                Select Type
              </option>
              {budgetOption.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {transactionId ? "Update" : "Add"} Transaction
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
