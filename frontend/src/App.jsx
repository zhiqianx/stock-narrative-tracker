import React, { useState } from 'react';
import SearchPanel from './components/SearchPanel';
import ResultsPanel from './components/ResultsPanel';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useStock } from './hooks/useStock';
import './styles/globals.css';

function App() {
  const [selectedStock, setSelectedStock] = useState(null);
  const { stockData, loading, error, searchByTicker, searchByCompany, clearError } = useStock();

  const handleStockSelect = async (searchTerm, searchType) => {
    clearError();
    
    try {
      let result;
      if (searchType === 'ticker') {
        result = await searchByTicker(searchTerm);
      } else {
        result = await searchByCompany(searchTerm);
      }
      
      if (result) {
        setSelectedStock(result);
      }
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SearchPanel onStockSelect={handleStockSelect} loading={loading} />
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} onClear={clearError} />}
          {!loading && !error && selectedStock && <ResultsPanel stockData={selectedStock} />}
          {!loading && !error && !selectedStock && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📈</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Select a Stock
                </h3>
                <p className="text-gray-500">
                  Search for a company or ticker to view its narrative
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
