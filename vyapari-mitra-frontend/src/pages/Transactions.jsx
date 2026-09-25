import React, { useEffect, useState } from 'react';
import { transactionAPI } from '../api/endpoints';
import toast from 'react-hot-toast';
import { FiFilter, FiTrash2 } from 'react-icons/fi';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    loadTransactions();
  }, []);

  // ✅ Filter logic inside useEffect
  useEffect(() => {
    let filtered = transactions;

    if (filterType !== 'all') {
      filtered = filtered.filter((t) => t.type === filterType);
    }

    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter((t) => {
        const date = new Date(t.transactionDate);
        return (
          date >= new Date(dateRange.start) &&
          date <= new Date(dateRange.end)
        );
      });
    }

    setFilteredTransactions(filtered);
  }, [filterType, dateRange, transactions]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionAPI.getToday();
      if (response.success) {
        setTransactions(response.data);
      }
    } catch (error) {
      toast.error('व्यवहार लोड करू शकत नाही');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('हटवायची खरे आहे?')) {
      try {
        const response = await transactionAPI.delete(id);
        if (response.success) {
          toast.success('व्यवहार हटविला');
          loadTransactions();
        }
      } catch (error) {
        toast.error('हटविणे अयशस्वी');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slideIn">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white font-marathi">
        व्यवहार विवरण
      </h1>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-4 transition-colors">
        <div className="flex items-center gap-2 mb-4">
          <FiFilter className="text-orange-500" />
          <span className="font-semibold text-gray-700 dark:text-gray-200 font-marathi">
            फिल्टर करा
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 font-marathi">
              प्रकार
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full p-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 transition"
            >
              <option value="all">सर्व</option>
              <option value="CREDIT">उधारी</option>
              <option value="PAYMENT">पैसे</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 font-marathi">
              सुरुवातीची तारीख
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full p-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 font-marathi">
              समाप्तीची तारीख
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full p-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 font-marathi">
              कोणी व्यवहार नाही
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 font-marathi">
                    ग्राहक
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 font-marathi">
                    प्रकार
                  </th>
                  <th className="px-6 py-3 text-right font-semibold text-gray-700 dark:text-gray-200 font-marathi">
                    रक्कम
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 font-marathi">
                    तारीख
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700 dark:text-gray-200 font-marathi">
                    कृती
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-100">
                      {transaction.customerName}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs font-bold ${
                          transaction.type === 'CREDIT'
                            ? 'bg-red-500'
                            : 'bg-green-500'
                        }`}
                      >
                        {transaction.type === 'CREDIT' ? 'उधारी' : 'पैसे'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`font-bold ${
                          transaction.type === 'CREDIT'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-green-600 dark:text-green-400'
                        }`}
                      >
                        ₹{transaction.amount?.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {new Date(transaction.transactionDate).toLocaleDateString('mr-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                          title="हटवा"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}