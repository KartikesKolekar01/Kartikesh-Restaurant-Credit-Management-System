import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerAPI } from '../api/endpoints';
import toast from 'react-hot-toast';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiUser } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';   // ✅ WhatsApp icon
import CreateCustomerModal from '../components/CreateCustomerModal';
import EditCustomerModal from '../components/EditCustomerModal';

export default function Customers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.mobile?.includes(search)
      );
      setFilteredCustomers(filtered);
    }
  }, [search, customers]);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const response = await customerAPI.getAll();
      if (response.success) {
        setCustomers(response.data);
      }
    } catch (error) {
      toast.error('ग्राहक लोड करू शकत नाही');
    } finally {
      setLoading(false);
    }
  };

  // ✅ WhatsApp Reminder Function
  const sendWhatsAppReminder = (customer, e) => {
    e.stopPropagation();   // Row click prevent करा

    // Mobile check
    if (!customer.mobile || customer.mobile.length !== 10) {
      toast.error('ग्राहकाचा मोबाईल नंबर नाही!');
      return;
    }

    // Balance check
    if (!customer.balance || customer.balance <= 0) {
      toast.error('या ग्राहकाची थकबाकी नाही!');
      return;
    }

    // Message तयार करा
    const message = `नमस्कार ${customer.name} जी,

आपली उधारी ₹${customer.balance.toFixed(2)} बाकी आहे.

कृपया लवकरात लवकर भरून टाका.

धन्यवाद! 🙏
- कार्तिकेश रेस्टॉरंट`;

    // WhatsApp URL
    const whatsappUrl = `https://wa.me/91${customer.mobile}?text=${encodeURIComponent(message)}`;

    // New tab मध्ये उघडा
    window.open(whatsappUrl, '_blank');
  };

  const handleDelete = async (id) => {
    if (window.confirm('हटवायची खरे आहे?')) {
      try {
        const response = await customerAPI.delete(id);
        if (response.success) {
          toast.success('ग्राहक हटविला');
          loadCustomers();
        }
      } catch (error) {
        toast.error(error.message || 'हटविणे अयशस्वी');
      }
    }
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white font-marathi">
          ग्राहक व्यवस्थापन
        </h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition flex items-center gap-2 shadow-md"
        >
          <FiPlus /> नवीन ग्राहक
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow transition-colors">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="नाव किंवा मोबाईल वरून शोधा"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 transition font-marathi"
          />
        </div>
      </div>

      {/* Customers List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors">
        {filteredCustomers.length === 0 ? (
          <div className="p-8 text-center">
            <FiUser className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-marathi">कोणी ग्राहक नाही</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 font-marathi">
                    नाव
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 font-marathi">
                    मोबाईल
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 font-marathi">
                    गाव
                  </th>
                  <th className="px-6 py-3 text-right font-semibold text-gray-700 dark:text-gray-200 font-marathi">
                    थकबाकी
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700 dark:text-gray-200 font-marathi">
                    कृती
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition"
                    onClick={() => navigate(`/customers/${customer.id}`)}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-100">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {customer.mobile}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {customer.village}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`font-bold ${
                          customer.balance > 0
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-green-600 dark:text-green-400'
                        }`}
                      >
                        ₹{customer.balance?.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="flex justify-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* ✅ WhatsApp Button */}
                        {customer.balance > 0 && customer.mobile && (
                          <button
                            onClick={(e) => sendWhatsAppReminder(customer, e)}
                            className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                            title="WhatsApp रिमाइंडर पाठवा"
                          >
                            <FaWhatsapp className="text-xl" />
                          </button>
                        )}

                        <button
                          onClick={() => handleEdit(customer)}
                          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                          title="संपादित करा"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
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

      {/* Modals */}
      {showCreateModal && (
        <CreateCustomerModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            loadCustomers();
          }}
        />
      )}

      {showEditModal && selectedCustomer && (
        <EditCustomerModal
          customer={selectedCustomer}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCustomer(null);
          }}
          onSuccess={() => {
            setShowEditModal(false);
            loadCustomers();
          }}
        />
      )}
    </div>
  );
}