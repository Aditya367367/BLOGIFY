import api from './api';

export const authService = {
  login: async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  signup: async (data) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  logout: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      await api.post('/auth/logout', { refreshToken });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },
};
