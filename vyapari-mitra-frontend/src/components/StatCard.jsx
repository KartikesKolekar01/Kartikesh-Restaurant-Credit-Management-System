import React from 'react';

export default function StatCard({ icon, label, value, color = 'bg-blue-500' }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className={`${color} text-white p-3 rounded-lg w-fit mb-4`}>
        {icon}
      </div>
      <p className="text-gray-600 text-sm font-marathi">{label}</p>
      <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
}
