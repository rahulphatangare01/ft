import React, { useEffect, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import "./TransactionList.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getTransaction } from "../services/transaction/transaction.service";

import { deleteTransactionThunk } from "../store/thunk/transaction/transaction.thunk";

interface TransactionListProps {
  onEdit: (id: string, transaction: any) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    date: "",
    category: "",
    amount: "",
  });
  const transaction = useSelector((state: RootState) => state.transaction);
  const itemsPerPage = 10;
  const [tableData, setTableData] = React.useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const filteredTransactions = tableData?.filter((transaction) => {
    return (
      (!filter.date || transaction.date.includes(filter.date)) &&
      (!filter.category ||
        transaction.category
          .toLowerCase()
          .includes(filter.category.toLowerCase())) &&
      (!filter.amount || transaction.amount.toString().includes(filter.amount))
    );
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string, title: string) => {
    const result = await Swal.fire({
      // title: "Are you sure?",
      title: `Delete <b>${title}</b>  transaction?`,

      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
    });

    if (result.isConfirmed) {
      const success = await dispatch(deleteTransactionThunk(id));
      if (deleteTransactionThunk.fulfilled.match(success)) {
        toast.success("Transaction deleted successfully");
      } else {
        toast.error("Error deleting Transaction");
      }
    }
  };

  useEffect(() => {
    const fetchTransactionCategories = async () => {
      try {
        const data = await getTransaction();
        setTableData(data?.data);
      } catch (error) {
        console.error("Error fetching budget categories:", error);
      }
    };

    fetchTransactionCategories();
  }, [transaction]);
  return (
    <div className="transaction-container">
      <div className="transaction-filters">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              placeholder="Filter by date"
              value={filter.date}
              onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by category"
              value={filter.category}
              onChange={(e) =>
                setFilter({ ...filter, category: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by amount"
              value={filter.amount}
              onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table transaction-table table-hover mb-0">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((transaction: any) => (
              <tr key={transaction.id}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      transaction.type === "income" ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td
                  className={
                    transaction.type === "income"
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  ${transaction.amount.toFixed(2)}
                </td>
                <td>
                  <div className="d-flex gap-2 transaction-actions">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        onEdit(transaction.id, transaction);
                        toast.success("Editing transaction");
                      }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        handleDelete(transaction.id, transaction.type)
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center p-3">
          <nav>
            <ul className="pagination mb-0">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
