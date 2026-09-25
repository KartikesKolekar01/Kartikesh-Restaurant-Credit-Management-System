import React, { useState } from 'react';
import { transactionAPI } from '../api/endpoints';
import toast from 'react-hot-toast';
import { FiX } from 'react-icons/fi';

export default function AddTransactionModal({ customer, type, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerId: customer.id,
    amount: '',
    transactionDate: new Date().toISOString().split('T')[0],
    description: '',
    dueDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error('रक्कम आवश्यक आहे');
      return;
    }

    if (type === 'payment' && parseFloat(formData.amount) > customer.balance) {
      toast.error('रक्कम थकबाकी पेक्षा जास्त आहे');
      return;
    }

    setLoading(true);
    try {
      const response = await (type === 'credit'
        ? transactionAPI.addCredit(formData)
        : transactionAPI.addPayment(formData));

      if (response.success) {
        toast.success(
          type === 'credit' ? 'उधारी जोडली गेली' : 'पैसे रेकॉर्ड केले गेले'
        );
        onSuccess();
      }
    } catch (error) {
      toast.error(error.message || 'अयशस्वी');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-bold font-marathi">
            {type === 'credit' ? 'उधारी जोडा' : 'पैसे भरा'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700 text-sm font-marathi">ग्राहक:</p>
            <p className="text-lg font-bold text-gray-800">{customer.name}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 font-marathi">
              रक्कम *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="1000"
              min="0"
              step="0.01"
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 font-marathi">
              तारीख
            </label>
            <input
              type="date"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleChange}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          {type === 'credit' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 font-marathi">
                शेवटची तारीख
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 font-marathi">
              विवरण
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="नोट्स..."
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              rows="3"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              रद्द करा
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-4 py-2 text-white rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${
                type === 'credit'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {loading ? 'लोड होत आहे...' : 'जोडा'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
