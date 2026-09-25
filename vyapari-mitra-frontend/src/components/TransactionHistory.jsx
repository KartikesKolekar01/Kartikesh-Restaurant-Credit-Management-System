import React from 'react';
import { transactionAPI } from '../api/endpoints';
import toast from 'react-hot-toast';
import { FiArrowDown, FiArrowUp, FiTrash2 } from 'react-icons/fi';

export default function TransactionHistory({ transactions, onRefresh }) {
  const handleDelete = async (id) => {
    if (window.confirm('हटवायची खरे आहे?')) {
      try {
        const response = await transactionAPI.delete(id);
        if (response.success) {
          toast.success('व्यवहार हटविला');
          onRefresh();
        }
      } catch (error) {
        toast.error('हटविणे अयशस्वी');
      }
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500 font-marathi">
        कोणी व्यवहार नाही
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-lg font-bold text-gray-800 font-marathi">व्यवहार इतिहास</h2>
      </div>

      <div className="divide-y">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-6 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-4 flex-1">
              <div
                className={`p-3 rounded-lg ${
                  transaction.type === 'CREDIT'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-green-100 text-green-600'
                }`}
              >
                {transaction.type === 'CREDIT' ? (
                  <FiArrowDown className="text-xl" />
                ) : (
                  <FiArrowUp className="text-xl" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  {transaction.type === 'CREDIT' ? 'उधारी' : 'पैसे'}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(transaction.transactionDate).toLocaleDateString('mr-IN')}
                </p>
                {transaction.description && (
                  <p className="text-sm text-gray-500 mt-1">{transaction.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p
                  className={`font-bold text-lg ${
                    transaction.type === 'CREDIT'
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}
                >
                  {transaction.type === 'CREDIT' ? '+' : '-'}₹
                  {transaction.amount?.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(transaction.id)}
                className="text-red-500 hover:text-red-700 p-2"
                title="हटवा"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
