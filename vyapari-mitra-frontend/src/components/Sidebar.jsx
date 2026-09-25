import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiDollarSign,
  FiBarChart2,
  FiMenu,
  FiX,
  FiLogOut,
  FiAlertTriangle,
  FiSun,
  FiMoon,
  FiSettings,
} from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { icon: FiHome, label: 'डॅशबोर्ड', path: '/dashboard' },
    { icon: FiUsers, label: 'ग्राहक', path: '/customers' },
    { icon: FiDollarSign, label: 'व्यवहार', path: '/transactions' },
    { icon: FiBarChart2, label: 'अहवाल', path: '/reports' },
    { icon: FiSettings, label: 'सेटिंग्ज', path: '/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate('/login');
  };

  const NavContent = () => (
    <nav className="space-y-2">
      {menuItems.map((item) => (
        <button
          key={item.path}
          onClick={() => {
            navigate(item.path);
            setIsOpen(false);
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-marathi font-semibold ${
            isActive(item.path)
              ? 'bg-orange-500 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </nav>
  );

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-marathi font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? (
        <>
          <FiSun className="text-xl text-yellow-500" />
          <span>लाइट मोड</span>
        </>
      ) : (
        <>
          <FiMoon className="text-xl text-blue-500" />
          <span>डार्क मोड</span>
        </>
      )}
    </button>
  );

  const LogoutButton = () => (
    <button
      onClick={() => setShowLogoutModal(true)}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-marathi font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
    >
      <FiLogOut className="text-xl" />
      लॉगआउट
    </button>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg z-50"
      >
        {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
        <div className="p-6">
          <div className="text-3xl mb-2">🍽️</div>
          <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-500 font-marathi">
            कार्तिकेश रेस्टॉरंट
          </h1>
        </div>

        <div className="flex-1 px-4 py-6 flex flex-col justify-between">
          <NavContent />
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-4 space-y-1">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 shadow-lg flex flex-col transition-colors">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="text-3xl mb-2">🍽️</div>
              <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-500 font-marathi">
                कार्तिकेश रेस्टॉरंट
              </h1>
            </div>
            <div className="flex-1 px-4 py-6 flex flex-col justify-between">
              <NavContent />
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-4 space-y-1">
                <ThemeToggle />
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
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
                नाही, राहू द्या
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 px-4 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2 font-marathi"
              >
                <FiLogOut />
                हो, करा
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}