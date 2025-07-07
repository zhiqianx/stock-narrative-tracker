import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for AI processing
});

export const stockAPI = {
  searchByTicker: async (symbol) => {
    try {
      const response = await api.get(`/search/ticker/${symbol}`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.response?.data?.error || 'Failed to fetch stock data');
    }
  },

  searchByCompany: async (companyName) => {
    try {
      const response = await api.post('/search/company', {
        company_name: companyName
      });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.response?.data?.error || 'Failed to search company');
    }
  },

  getStockHistory: async (symbol, days = 30) => {
    try {
      const response = await api.get(`/stock/${symbol}/history?days=${days}`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.response?.data?.error || 'Failed to fetch stock history');
    }
  }
};
