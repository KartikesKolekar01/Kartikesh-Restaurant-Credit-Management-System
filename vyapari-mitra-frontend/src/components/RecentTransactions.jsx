import React, { useEffect, useState } from 'react';
import { transactionAPI } from '../api/endpoints';
import toast from 'react-hot-toast';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionAPI.getToday();
      if (response.success) {
        setTransactions(response.data.slice(0, 5));
      }
    } catch (error) {
      toast.error('व्यवहार लोड करू शकत नाही');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="spinner mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-lg font-bold text-gray-800 font-marathi">अलीकडील व्यवहार</h2>
      </div>

      <div className="divide-y">
        {transactions.length === 0 ? (
          <div className="p-6 text-center text-gray-500 font-marathi">
            कोणी व्यवहार नाही
          </div>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-6 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">
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
                <div>
                  <p className="font-semibold text-gray-800">
                    {transaction.customerName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(transaction.transactionDate).toLocaleDateString('mr-IN')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold text-lg ${
                    transaction.type === 'CREDIT'
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}
                >
                  {transaction.type === 'CREDIT' ? '+' : '-'}₹{transaction.amount?.toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
