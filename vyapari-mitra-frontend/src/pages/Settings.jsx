import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { settingsAPI } from '../api/endpoints';
import toast from 'react-hot-toast';
import { FiSave, FiLogOut, FiLock, FiDownload, FiHardDrive } from 'react-icons/fi';

export default function Settings() {
  const logout = useAuthStore((state) => state.logout);
  const [shopData, setShopData] = useState({ shopName: '', ownerName: '' });
  const [pinData, setPinData] = useState({ oldPin: '', newPin: '', confirmPin: '' });
  const [storageInfo, setStorageInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [shopRes, storageRes] = await Promise.all([
        settingsAPI.getShop(),
        settingsAPI.getStorage(),
      ]);

      if (shopRes.success) {
        setShopData({
          shopName: shopRes.data.shopName,
          ownerName: shopRes.data.ownerName,
        });
      }
      if (storageRes.success) {
        setStorageInfo(storageRes.data);
      }
    } catch (error) {
      toast.error('सेटिंग्स लोड करू शकत नाही');
    }
  };

  const handleUpdateShop = async (e) => {
    e.preventDefault();
    if (!shopData.shopName.trim() || !shopData.ownerName.trim()) {
      toast.error('सर्व फील्ड भरा');
      return;
    }

    setLoading(true);
    try {
      const response = await settingsAPI.updateShop(shopData.shopName, shopData.ownerName);
      if (response.success) {
        toast.success('दुकान तपशील अपडेट झाले');
      }
    } catch (error) {
      toast.error('अपडेट अयशस्वी');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePin = async (e) => {
    e.preventDefault();

    if (!pinData.oldPin || !pinData.newPin || !pinData.confirmPin) {
      toast.error('सर्व फील्ड भरा');
      return;
    }

    if (pinData.oldPin.length !== 4 || pinData.newPin.length !== 4) {
      toast.error('PIN 4 अंकी असावा');
      return;
    }

    if (pinData.newPin !== pinData.confirmPin) {
      toast.error('नवीन PIN जुळत नाही');
      return;
    }

    setLoading(true);
    try {
      const response = await settingsAPI.updatePin(pinData.oldPin, pinData.newPin);
      if (response.success) {
        toast.success('PIN अपडेट झाला');
        setPinData({ oldPin: '', newPin: '', confirmPin: '' });
      }
    } catch (error) {
      toast.error(error.message || 'PIN अपडेट अयशस्वी');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBackup = async () => {
    setLoading(true);
    try {
      const response = await settingsAPI.createBackup();
      if (response.success) {
        toast.success('बॅकअप यशस्वीरित्या तयार झाला!');
      }
    } catch (error) {
      toast.error('बॅकअप विफल');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('लॉगआउट करायचे?')) {
      logout();
      toast.success('लॉगआउट यशस्वी');
    }
  };

  return (
    <div className="space-y-6 animate-slideIn max-w-2xl">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white font-marathi">
        सेटिंग्स
      </h1>

      {/* Shop Details */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 font-marathi">
          दुकान तपशील
        </h2>
        <form onSubmit={handleUpdateShop} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 font-marathi">
              दुकानाचं नाव
            </label>
            <input
              type="text"
              value={shopData.shopName}
              onChange={(e) => setShopData({ ...shopData, shopName: e.target.value })}
              className="w-full p-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 font-marathi">
              मालकाचं नाव
            </label>
            <input
              type="text"
              value={shopData.ownerName}
              onChange={(e) => setShopData({ ...shopData, ownerName: e.target.value })}
              className="w-full p-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
          >
            <FiSave /> अपडेट करा
          </button>
        </form>
      </div>

      {/* PIN Change */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 font-marathi">
          PIN बदला
        </h2>
        <form onSubmit={handleUpdatePin} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 font-marathi">
              जुना PIN
            </label>
            <input
              type="password"
              value={pinData.oldPin}
              onChange={(e) => setPinData({ ...pinData, oldPin: e.target.value })}
              maxLength="4"
              placeholder="••••"
              className="w-full p-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 font-marathi">
              नवीन PIN
            </label>
            <input
              type="password"
              value={pinData.newPin}
              onChange={(e) => setPinData({ ...pinData, newPin: e.target.value })}
              maxLength="4"
              placeholder="••••"
              className="w-full p-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 font-marathi">
              नवीन PIN पुष्टी करा
            </label>
            <input
              type="password"
              value={pinData.confirmPin}
              onChange={(e) => setPinData({ ...pinData, confirmPin: e.target.value })}
              maxLength="4"
              placeholder="••••"
              className="w-full p-2 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
          >
            <FiLock /> PIN बदला
          </button>
        </form>
      </div>

      {/* Storage Info */}
      {storageInfo && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 font-marathi flex items-center gap-2">
            <FiHardDrive className="text-purple-500" />
            संचयन माहिती
          </h2>
          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">एकूण फोटो:</span>{' '}
              {storageInfo.totalPhotos}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">वापरलेले संचयन:</span>{' '}
              {storageInfo.storageUsed}
            </p>
          </div>
        </div>
      )}

      {/* Backup */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 font-marathi">
          बॅकअप
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-marathi">
          तुमचा सर्व डेटा (ग्राहक, व्यवहार, फोटो) ZIP फाइलमध्ये सेव्ह करा.
        </p>
        <button
          onClick={handleCreateBackup}
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
        >
          <FiDownload /> बॅकअप तयार करा
        </button>
      </div>

      {/* Logout */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2 font-semibold"
        >
          <FiLogOut /> लॉगआउट करा
        </button>
      </div>
    </div>
  );
}