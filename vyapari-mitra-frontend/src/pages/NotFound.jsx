import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8 font-marathi">पृष्ठ आढळला नाही</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center justify-center gap-2 mx-auto bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
        >
          <FiHome /> मुख्य पृष्ठ
        </button>
      </div>
    </div>
  );
}
