import { useState } from 'react';
import { stockAPI } from '../services/api';

export const useStock = () => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchByTicker = async (symbol) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await stockAPI.searchByTicker(symbol);
      setStockData(data);
      return data;
    } catch (err) {
      setError(err.message);
      setStockData(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const searchByCompany = async (companyName) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await stockAPI.searchByCompany(companyName);
      setStockData(data);
      return data;
    } catch (err) {
      setError(err.message);
      setStockData(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    stockData,
    loading,
    error,
    searchByTicker,
    searchByCompany,
    clearError
  };
};

// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
