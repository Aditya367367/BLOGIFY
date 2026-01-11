import api from './api';

export const blogService = {
  getAllBlogs: async (params = {}) => {
    const response = await api.get('/blogs', { params });
    const data = response.data;
    // Handle both old and new response formats
    return {
      blogs: data.blogs || data,
      total: data.total || 0,
      page: data.page || 1,
      pages: data.pages || 1
    };
  },

  getBlogById: async (id) => {
    const response = await api.get(`/blogs/${id}`);
    const data = response.data;
    // Return either data.data (new format) or the whole response (old format)
    return data.data || data;
  },

  getCategories: async () => {
    const response = await api.get('/blogs/categories');
    const data = response.data;
    // Return either data.data (new format) or the whole response (old format)
    return data.data || data;
  },

  getAuthors: async () => {
    const response = await api.get('/blogs/authors');
    const data = response.data;
    // Return either data.data (new format) or the whole response (old format)
    return data.data || data;
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
