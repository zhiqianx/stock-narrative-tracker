import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const SearchPanel = ({ onStockSelect, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Popular stocks for quick selection
  const popularStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    { symbol: 'META', name: 'Meta Platforms Inc.' },
    { symbol: 'NFLX', name: 'Netflix Inc.' }
  ];

  const filteredStocks = popularStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(e.target.value.length > 0);
  };

  const handleStockClick = (stock) => {
    setSearchTerm('');
    setIsDropdownOpen(false);
    onStockSelect(stock.symbol, 'ticker');
  };

  const handleSearchName = () => {
    if (!searchTerm.trim()) return;
    onStockSelect(searchTerm.trim(), 'company');
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const handleSearchTicker = () => {
    if (!searchTerm.trim()) return;
    onStockSelect(searchTerm.trim().toUpperCase(), 'ticker');
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Default to ticker search on Enter
      handleSearchTicker();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          STOCK NARRATIVE TRACKER
        </h1>
        <p className="text-gray-600">
          Discover the stories behind stock movements
        </p>
      </div>

      <div className="space-y-6">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Insert Ticker Symbol or Company Name"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            onFocus={() => searchTerm.length > 0 && setIsDropdownOpen(true)}
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button 
            onClick={() => {
              setSearchTerm('');
              setIsDropdownOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>

          {/* Dropdown */}
          {isDropdownOpen && filteredStocks.length > 0 && !loading && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
              {filteredStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  onClick={() => handleStockClick(stock)}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-semibold text-gray-800">{stock.symbol}</div>
                  <div className="text-sm text-gray-600">{stock.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSearchName}
            disabled={!searchTerm.trim() || loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {loading ? 'Searching...' : 'Search Name'}
          </button>
          <button
            onClick={handleSearchTicker}
            disabled={!searchTerm.trim() || loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {loading ? 'Searching...' : 'Search Ticker'}
          </button>
        </div>

        {/* Popular Stocks */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Stocks</h3>
          <div className="grid grid-cols-2 gap-2">
            {popularStocks.slice(0, 8).map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => !loading && handleStockClick(stock)}
                className={`flex justify-between items-center p-3 rounded-lg transition-colors duration-150 ${
                  loading 
                    ? 'bg-gray-100 cursor-not-allowed' 
                    : 'hover:bg-gray-50 cursor-pointer'
                }`}
              >
                <div>
                  <div className="font-semibold text-gray-800">{stock.symbol}</div>
                  <div className="text-sm text-gray-600 truncate">{stock.name}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
