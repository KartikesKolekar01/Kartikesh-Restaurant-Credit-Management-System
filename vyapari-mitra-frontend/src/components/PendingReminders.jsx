import React, { useEffect, useState } from 'react';
import { reminderAPI } from '../api/endpoints';
import toast from 'react-hot-toast';
import { FiAlertCircle } from 'react-icons/fi';

export default function PendingReminders() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      setLoading(true);
      const response = await reminderAPI.getToday();
      if (response.success) {
        setReminders(response.data);
      }
    } catch (error) {
      toast.error('स्मरणीय लोड करू शकत नाही');
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
        <h2 className="text-lg font-bold text-gray-800 font-marathi">स्मरणीय</h2>
      </div>

      <div className="divide-y max-h-96 overflow-y-auto">
        {reminders.length === 0 ? (
          <div className="p-6 text-center text-gray-500 font-marathi">
            कोणी स्मरणीय नाही
          </div>
        ) : (
          reminders.map((reminder, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="text-yellow-600 text-xl mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {reminder.customerName}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 font-marathi">
                    ₹{reminder.amount?.toFixed(2)} थकबाकी
                  </p>
                  <p className="text-xs text-red-600 mt-1 font-marathi">
                    शेवट: {new Date(reminder.dueDate).toLocaleDateString('mr-IN')}
                  </p>
                  {reminder.daysOverdue > 0 && (
                    <p className="text-xs text-red-700 font-bold mt-1 font-marathi">
                      {reminder.daysOverdue} दिवस विलंब
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
