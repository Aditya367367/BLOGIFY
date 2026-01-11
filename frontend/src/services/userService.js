import api from './api';

export const userService = {
  getUserById: async (id) => {
    constresponse = await api.get(`/users/${id}`);
    return response.data;
  },
};
