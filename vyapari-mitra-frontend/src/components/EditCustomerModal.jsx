import React, { useState } from 'react';
import { customerAPI } from '../api/endpoints';
import toast from 'react-hot-toast';
import { FiX } from 'react-icons/fi';

export default function EditCustomerModal({ customer, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: customer.name,
    mobile: customer.mobile || '',
    address: customer.address || '',
    village: customer.village || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('ग्राहक का नाव आवश्यक आहे');
      return;
    }

    if (formData.mobile && formData.mobile.length !== 10) {
      toast.error('मोबाईल 10 अंकी असावा');
      return;
    }

    setLoading(true);
    try {
      const response = await customerAPI.update(customer.id, formData);
      if (response.success) {
        toast.success('ग्राहक अपडेट झाला');
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
          <h2 className="text-lg font-bold font-marathi">ग्राहक संपादित करा</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 font-marathi">
              नाव
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 font-marathi">
              मोबाईल
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              maxLength="10"
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 font-marathi">
              पत्ता
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 font-marathi">
              गाव
            </label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
            />
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
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'लोड होत आहे...' : 'अपडेट करा'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
