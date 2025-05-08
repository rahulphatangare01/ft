import React, { useState } from "react";
// import { useTransactions } from '../context/TransactionContext';
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { Plus } from "lucide-react";

const Transactions: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<string | null>(
    null
  );

  const [transactionDataToEdit, setTransactionDataToEdit] = useState<any>();
  // const { transactions } = useTransactions();

  return (
    <div className="ml-8 pl-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} className="me-2" />
          Add Transaction
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <TransactionForm
            onClose={() => {
              setShowForm(false);
              setEditingTransaction(null);
            }}
            transactionId={editingTransaction}
            transactionData={transactionDataToEdit}
          />
        </div>
      )}

      <TransactionList
        onEdit={(id, transaction) => {
          setTransactionDataToEdit(transaction);
          setEditingTransaction(id);
          setShowForm(true);
        }}
      />
    </div>
  );
};

export default Transactions;
