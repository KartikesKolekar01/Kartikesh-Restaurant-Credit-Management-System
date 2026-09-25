import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import toast from 'react-hot-toast';
import {
  FiBriefcase,
  FiUser,
  FiPhone,
  FiLock,
  FiUserPlus,
  FiSun,
  FiMoon,
} from 'react-icons/fi';

export default function Register() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const { theme, toggleTheme } = useThemeStore();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    mobile: '',
    pin: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.shopName.trim()) {
      toast.error('दुकानाचं नाव प्रविष्ट करा');
      return;
    }

    if (!formData.ownerName.trim()) {
      toast.error('मालकाचं नाव प्रविष्ट करा');
      return;
    }

    if (formData.mobile.length !== 10) {
      toast.error('मोबाईल नंबर 10 अंकी असावा');
      return;
    }

    if (formData.pin.length !== 4) {
      toast.error('PIN 4 अंकी असावा');
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      toast.success('नोंदणी यशस्वी! 🎉');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'नोंदणी अयशस्वी');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-400 to-red-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors">
      {/* ✅ Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-3 rounded-full bg-white/90 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-lg hover:scale-110 transition-transform z-10"
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      >
        {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 animate-fadeIn transition-colors">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🍽️</div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white font-marathi">
              कार्तिकेश रेस्टॉरंट
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 font-marathi">
              नवीन खाता तयार करा
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Shop Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 font-marathi">
                दुकानाचं नाव
              </label>
              <div className="relative">
                <FiBriefcase className="absolute left-3 top-3 text-gray-400 text-lg" />
                <input
                  type="text"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  placeholder="कार्तिकेश रेस्टॉरंट"
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 transition text-sm"
                />
              </div>
            </div>

            {/* Owner Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 font-marathi">
                मालकाचं नाव
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400 text-lg" />
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="तुमचं नाव"
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 transition text-sm"
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 font-marathi">
                मोबाईल नंबर
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-3 text-gray-400 text-lg" />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="9876543210"
                  maxLength="10"
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 transition text-sm"
                />
              </div>
            </div>

            {/* PIN */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 font-marathi">
                PIN (4 अंक)
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400 text-lg" />
                <input
                  type="password"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  placeholder="••••"
                  maxLength="4"
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 transition text-sm"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiUserPlus />
              {loading ? 'लोड होत आहे...' : 'नोंदणी करा'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 font-marathi">
              आधीच खाता आहे?{' '}
              <Link
                to="/login"
                className="text-orange-500 font-bold hover:text-orange-600 transition"
              >
                लॉगिन करा
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}