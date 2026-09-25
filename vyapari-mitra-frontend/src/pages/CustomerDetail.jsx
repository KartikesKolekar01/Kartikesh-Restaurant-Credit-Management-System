import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { customerAPI, transactionAPI } from '../api/endpoints';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiPhone, FiMapPin, FiDollarSign } from 'react-icons/fi';
import AddTransactionModal from '../components/AddTransactionModal';
import TransactionHistory from '../components/TransactionHistory';

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [transactionType, setTransactionType] = useState('credit');

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [customerRes, transactionRes] = await Promise.all([
        customerAPI.getById(id),
        transactionAPI.getByCustomer(id),
      ]);

      if (customerRes.success) setCustomer(customerRes.data);
      if (transactionRes.success) setTransactions(transactionRes.data);
    } catch (error) {
      toast.error('डेटा लोड करू शकत नाही');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">ग्राहक आढळला नाही</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slideIn">
      {/* Back Button */}
      <button
        onClick={() => navigate('/customers')}
        className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
      >
        <FiArrowLeft /> परत जा
      </button>

      {/* Customer Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold font-marathi">{customer.name}</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div>
            <p className="text-blue-100 text-sm font-marathi">मोबाईल</p>
            <p className="flex items-center gap-2 mt-1">
              <FiPhone /> {customer.mobile}
            </p>
          </div>
          <div>
            <p className="text-blue-100 text-sm font-marathi">पत्ता</p>
            <p className="flex items-center gap-2 mt-1 flex-wrap">
              <FiMapPin /> {customer.address}
            </p>
          </div>
          <div>
            <p className="text-blue-100 text-sm font-marathi">गाव</p>
            <p className="mt-1">{customer.village}</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm font-marathi">नोंदणी</p>
            <p className="mt-1">{new Date(customer.createdAt).toLocaleDateString('mr-IN')}</p>
          </div>
        </div>
      </div>

      {/* Balance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm font-marathi">एकूण उधारी</p>
          <p className="text-2xl font-bold text-orange-600 mt-2">
            ₹{customer.totalCredit?.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm font-marathi">एकूण भरलेले</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            ₹{customer.totalPaid?.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm font-marathi">वर्तमान थकबाकी</p>
          <p
            className={`text-2xl font-bold mt-2 ${
              customer.balance > 0 ? 'text-red-600' : 'text-green-600'
            }`}
          >
            ₹{customer.balance?.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Add Transaction Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => {
            setTransactionType('credit');
            setShowAddTransaction(true);
          }}
          className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-semibold font-marathi"
        >
          उधारी जोडा
        </button>
        <button
          onClick={() => {
            setTransactionType('payment');
            setShowAddTransaction(true);
          }}
          className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold font-marathi"
        >
          पैसे भरा
        </button>
      </div>

      {/* Transaction History */}
      <div>
        <TransactionHistory transactions={transactions} onRefresh={loadData} />
      </div>

      {/* Modal */}
      {showAddTransaction && (
        <AddTransactionModal
          customer={customer}
          type={transactionType}
          onClose={() => setShowAddTransaction(false)}
          onSuccess={() => {
            setShowAddTransaction(false);
            loadData();
          }}
        />
      )}
    </div>
  );
}
