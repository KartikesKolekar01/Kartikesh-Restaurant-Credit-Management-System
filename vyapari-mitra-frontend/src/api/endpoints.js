import api from './axios';

// ============ AUTH ENDPOINTS ============
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  checkOwner: () => api.get('/api/auth/check-owner'),
  getOwnerDetails: () => api.get('/api/auth/owner-details'),
};

// ============ CUSTOMER ENDPOINTS ============
export const customerAPI = {
  create: (data) => api.post('/api/customers', data),
  getAll: () => api.get('/api/customers'),
  getById: (id) => api.get(`/api/customers/${id}`),
  update: (id, data) => api.put(`/api/customers/${id}`, data),
  delete: (id) => api.delete(`/api/customers/${id}`),
  search: (keyword) => api.get(`/api/customers/search?keyword=${keyword}`),
  getWithBalance: () => api.get('/api/customers/balance'),
  getByVillage: (village) => api.get(`/api/customers/village/${village}`),
  getCount: () => api.get('/api/customers/count'),
};

// ============ TRANSACTION ENDPOINTS ============
export const transactionAPI = {
  addCredit: (data) => api.post('/api/transactions/credit', data),
  addPayment: (data) => api.post('/api/transactions/payment', data),
  getByCustomer: (customerId) => api.get(`/api/transactions/customer/${customerId}`),
  getById: (id) => api.get(`/api/transactions/${id}`),
  getToday: () => api.get('/api/transactions/today'),
  getPending: () => api.get('/api/transactions/pending'),
  getBetween: (start, end) => api.get(`/api/transactions/between?start=${start}&end=${end}`),
  getByType: (type) => api.get(`/api/transactions/type/${type}`),
  getBalance: (customerId) => api.get(`/api/transactions/balance/${customerId}`),
  delete: (id) => api.delete(`/api/transactions/${id}`),
};

// ============ DASHBOARD ENDPOINTS ============
export const dashboardAPI = {
  getHome: () => api.get('/api/dashboard/home'),
  getStats: () => api.get('/api/dashboard/stats'),
};

// ============ REPORT ENDPOINTS ============
export const reportAPI = {
  getDaily: (date) => api.get(`/api/reports/daily?date=${date}`),
  getMonthly: (year, month) => api.get(`/api/reports/monthly?year=${year}&month=${month}`),
  getYearly: (year) => api.get(`/api/reports/yearly?year=${year}`),
  getPending: () => api.get('/api/reports/pending'),
  getByCustomer: (customerId) => api.get(`/api/reports/customer/${customerId}`),
};

// ============ REMINDER ENDPOINTS ============
export const reminderAPI = {
  getToday: () => api.get('/api/reminders/today'),
  getWeek: () => api.get('/api/reminders/week'),
};

// ============ FILE ENDPOINTS ============
export const fileAPI = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadForTransaction: (transactionId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/api/files/upload/transaction/${transactionId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  view: (fileName) => `${api.defaults.baseURL}/api/files/view/${fileName}`,
  delete: (fileName) => api.delete(`/api/files/delete/${fileName}`),
  getTransactionFiles: (transactionId) => api.get(`/api/files/transaction/${transactionId}`),
};

// ============ SEARCH ENDPOINTS ============
export const searchAPI = {
  global: (keyword) => api.get(`/api/search?keyword=${keyword}`),
  quick: (keyword) => api.get(`/api/search/quick?keyword=${keyword}`),
};

// ============ SETTINGS ENDPOINTS ============
export const settingsAPI = {
  getShop: () => api.get('/api/settings/shop'),
  updateShop: (shopName, ownerName) => 
    api.put(`/api/settings/shop?shopName=${shopName}&ownerName=${ownerName}`),
  updatePin: (oldPin, newPin) => 
    api.put(`/api/settings/pin?oldPin=${oldPin}&newPin=${newPin}`),
  getStorage: () => api.get('/api/settings/storage'),
  createBackup: () => api.post('/api/settings/backup'),
};

// ============ TEST ENDPOINTS ============
export const testAPI = {
  hello: () => api.get('/api/test/hello'),
  marathi: () => api.get('/api/test/marathi'),
};
