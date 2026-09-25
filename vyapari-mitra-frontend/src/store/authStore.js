import { create } from 'zustand';
import { authAPI } from '../api/endpoints';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await authAPI.register(data);
      set({ user: response.data, loading: false });
      localStorage.setItem('user', JSON.stringify(response.data));
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await authAPI.login(data);
      set({ user: response.data, loading: false });
      localStorage.setItem('user', JSON.stringify(response.data));
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  checkOwner: async () => {
    try {
      const response = await authAPI.checkOwner();
      return response;
    } catch (error) {
      return { exists: false };
    }
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem('user');
  },

  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  },
}));
