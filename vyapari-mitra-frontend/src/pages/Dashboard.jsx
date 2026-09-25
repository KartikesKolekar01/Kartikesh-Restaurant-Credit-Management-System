import React, { useEffect, useState } from 'react';
import { dashboardAPI } from '../api/endpoints';
import toast from 'react-hot-toast';
import { FiUsers, FiTrendingUp, FiAlertCircle, FiDollarSign } from 'react-icons/fi';
import StatCard from '../components/StatCard';
import RecentTransactions from '../components/RecentTransactions';
import PendingReminders from '../components/PendingReminders';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await dashboardAPI.getHome();
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      toast.error('डॅशबोर्ड लोड करू शकत नाही');
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

  if (!data) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600 dark:text-gray-400 font-marathi">
          डेटा लोड होऊ शकला नाही
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slideIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold font-marathi">{data.shopName}</h1>
        <p className="text-orange-100 mt-1 font-marathi">मालक: {data.ownerName}</p>
        <p className="text-orange-100 text-sm mt-1">
          आज: {new Date(data.date).toLocaleDateString('mr-IN')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<FiUsers className="text-2xl" />}
          label="एकूण ग्राहक"
          value={data.totalCustomers}
          color="bg-blue-500"
        />
        <StatCard
          icon={<FiAlertCircle className="text-2xl" />}
          label="थकबाकीदार"
          value={data.customersWithBalance}
          color="bg-red-500"
        />
        <StatCard
          icon={<FiTrendingUp className="text-2xl" />}
          label="आज व्यवहार"
          value={data.todayTransactions}
          color="bg-green-500"
        />
        <StatCard
          icon={<FiDollarSign className="text-2xl" />}
          label="एकूण थकबाकी"
          value={`₹${data.totalOutstanding?.toFixed(2)}`}
          color="bg-orange-500"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>

        {/* Pending Reminders */}
        <div>
          <PendingReminders />
        </div>
      </div>
    </div>
  );
}