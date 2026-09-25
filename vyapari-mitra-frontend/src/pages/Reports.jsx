import React, { useState } from 'react';
import { reportAPI } from '../api/endpoints';
import toast from 'react-hot-toast';
import { FiCalendar, FiBarChart2 } from 'react-icons/fi';

export default function Reports() {
  const [reportType, setReportType] = useState('daily');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const generateReport = async () => {
    try {
      setLoading(true);
      let response;

      switch (reportType) {
        case 'daily':
          response = await reportAPI.getDaily(selectedDate);
          break;
        case 'monthly':
          response = await reportAPI.getMonthly(selectedYear, selectedMonth);
          break;
        case 'yearly':
          response = await reportAPI.getYearly(selectedYear);
          break;
        case 'pending':
          response = await reportAPI.getPending();
          break;
        default:
          return;
      }

      if (response.success) {
        setReportData(response.data);
      }
    } catch (error) {
      toast.error('अहवाल तयार करू शकत नाही');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-slideIn">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 font-marathi">अहवाल</h1>

      {/* Report Type Selection */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-marathi">
              अहवाल प्रकार
            </label>
            <select
              value={reportType}
              onChange={(e) => {
                setReportType(e.target.value);
                setReportData(null);
              }}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
            >
              <option value="daily">दैनिक</option>
              <option value="monthly">मासिक</option>
              <option value="yearly">वार्षिक</option>
              <option value="pending">थकबाकी</option>
            </select>
          </div>

          {/* Date Selection */}
          {reportType === 'daily' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-marathi">
                तारीख निवडा
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          )}

          {reportType === 'monthly' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-marathi">
                  महिना
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                    <option key={m} value={m}>
                      {new Date(2000, m - 1).toLocaleDateString('mr-IN', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-marathi">
                  वर्ष
                </label>
                <input
                  type="number"
                  min="2020"
                  max={new Date().getFullYear()}
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
            </>
          )}

          {reportType === 'yearly' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-marathi">
                वर्ष
              </label>
              <input
                type="number"
                min="2020"
                max={new Date().getFullYear()}
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          )}
        </div>

        <button
          onClick={generateReport}
          disabled={loading}
          className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
        >
          <FiBarChart2 />
          {loading ? 'लोड होत आहे...' : 'अहवाल तयार करा'}
        </button>
      </div>

      {/* Report Display */}
      {reportData && (
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 font-marathi">
              {reportData.reportType === 'DAILY' ? 'दैनिक' : reportData.reportType === 'MONTHLY' ? 'मासिक' : 'वार्षिक'} अहवाल
            </h2>
            <p className="text-gray-600 font-marathi">
              अवधी: {reportData.period}
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <p className="text-gray-600 text-sm font-marathi">एकूण उधारी</p>
              <p className="text-2xl font-bold text-red-600 mt-2">
                ₹{reportData.totalCredit?.toFixed(2)}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <p className="text-gray-600 text-sm font-marathi">एकूण भरलेले</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                ₹{reportData.totalPayment?.toFixed(2)}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-gray-600 text-sm font-marathi">थकबाकी</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                ₹{reportData.pendingAmount?.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Top Defaulters */}
          {reportData.topDefaulters?.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 font-marathi">
                मुख्य थकबाकीदार
              </h3>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                {reportData.topDefaulters.map((customer, index) => (
                  <div
                    key={index}
                    className="p-4 border-b flex justify-between items-center hover:bg-gray-100"
                  >
                    <div>
                      <p className="font-semibold">{customer.name}</p>
                      <p className="text-sm text-gray-600">
                        {customer.mobile} • {customer.village}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-red-600">
                      ₹{customer.balance?.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
