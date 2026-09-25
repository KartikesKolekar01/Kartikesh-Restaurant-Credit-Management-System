import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiAlertTriangle, FiSun, FiMoon } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm px-6 py-3 flex items-center justify-between transition-colors">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white font-marathi">
            {user?.shopName || 'कार्तिकेश रेस्टॉरंट'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-marathi">
            {user?.ownerName || ''}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* ✅ Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* ✅ Logout Icon */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title="लॉगआउट"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </header>

      {/* Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-amber-100 dark:bg-amber-900/30">
                <FiAlertTriangle className="text-3xl text-amber-600 dark:text-amber-400" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white font-marathi mb-2">
              लॉगआउट करायचं?
            </h2>

            <p className="text-center text-gray-600 dark:text-gray-400 font-marathi mb-6">
              तुम्हाला खात्री आहे का की तुम्हाला लॉगआउट करायचं आहे?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition font-marathi"
              >
                नाही
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 px-4 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2 font-marathi"
              >
                <FiLogOut />
                हो, लॉगआउट
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}