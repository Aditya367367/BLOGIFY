import api from './api';

export const blogService = {
  getAllBlogs: async (params = {}) => {
    const response = await api.get('/blogs', { params });
    return response.data;
  },

  getBlogById: async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/blogs/categories');
    return response.data;
  },

  getAuthors: async () => {
    const response = await api.get('/blogs/authors');
    return response.data;
  },

  createBlog: async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        // Only append if it's a file or not empty string
        if (key === 'image' && !(data[key] instanceof File)) {
            return;
        }
        formData.append(key, data[key]);
      }
    });
    const response = await api.post('/blogs', formData);
    return response.data;
  },

  updateBlog: async (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        // Only append if it's a file or not empty string
        if (key === 'image' && !(data[key] instanceof File)) {
             return;
        }
        formData.append(key, data[key]);
      }
    });
    const response = await api.put(`/blogs/${id}`, formData);
    return response.data;
  },

  deleteBlog: async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },
};
