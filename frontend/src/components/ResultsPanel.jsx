import React from 'react';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/formatters';

const ResultsPanel = ({ stockData }) => {
  if (!stockData) return null;

  const {
    symbol,
    name,
    price,
    change,
    change_percent,
    direction,
    narrative,
    key_factors,
    sentiment,
    volume,
    market_cap
  } = stockData;

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          {name}
        </h2>
        <p className="text-xl text-gray-600 font-medium">
          {symbol}
        </p>
      </div>

      {/* Price Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          {direction === 'up' ? (
            <div className="flex items-center">
              <TrendingUp className="w-16 h-16 text-green-500 mr-4" />
              <div className="text-left">
                <div className="text-2xl font-bold text-green-500">
                  +{formatCurrency(change)} (+{change_percent.toFixed(2)}%)
                </div>
                <div className="text-4xl font-bold text-gray-800">
                  {formatCurrency(price)}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <TrendingDown className="w-16 h-16 text-red-500 mr-4" />
              <div className="text-left">
                <div className="text-2xl font-bold text-red-500">
                  {formatCurrency(change)} ({change_percent.toFixed(2)}%)
                </div>
                <div className="text-4xl font-bold text-gray-800">
                  {formatCurrency(price)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional metrics */}
        {(volume || market_cap) && (
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            {volume && (
              <div>
                <span className="font-medium">Volume: </span>
                {formatNumber(volume)}
              </div>
            )}
            {market_cap && (
              <div>
                <span className="font-medium">Market Cap: </span>
                {formatCurrency(market_cap, true)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* What Happened */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">What Happened?</h3>
        
        {/* Sentiment Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${
            sentiment === 'positive' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            <span className="text-lg mr-2">
              {sentiment === 'positive' ? '😊' : '😟'}
            </span>
            {sentiment === 'positive' ? 'Positive News' : 'Concerning News'}
          </div>
        </div>

        {/* Main Explanation */}
        <div className="bg-gray-50 rounded-lg p-6 mb-4">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="mr-2">📊</span>
            In Simple Terms:
          </h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            {narrative}
          </p>
          
          {/* Key Factors */}
          {key_factors && key_factors.length > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <h5 className="font-medium text-gray-800 mb-3">Key Factors:</h5>
              <div className="grid grid-cols-1 gap-2">
                {key_factors.map((factor, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">{factor.split(' ')[0]}</span>
                    <span>{factor.substring(factor.indexOf(' ') + 1)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* What This Means */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
            <span className="mr-2">💡</span>
            What This Means For You:
          </h4>
          <div className="text-sm text-blue-700 space-y-1">
            {direction === 'up' ? (
              <>
                <div>• <strong>If you own the stock:</strong> Good news! Your investment is growing</div>
                <div>• <strong>As a customer:</strong> Company is doing well, expect continued innovation</div>
                <div>• <strong>General impact:</strong> Positive sign for the industry</div>
              </>
            ) : (
              <>
                <div>• <strong>If you own the stock:</strong> Temporary setback, but fundamentals may remain strong</div>
                <div>• <strong>As a customer:</strong> Services should continue as normal</div>
                <div>• <strong>General impact:</strong> Part of normal market fluctuations</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Related Links */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Learn More</h3>
        <div className="space-y-2">
          <a 
            href={`https://finance.yahoo.com/quote/${symbol}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors duration-200"
          >
            <span className="text-gray-700">View on Yahoo Finance</span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
          <a 
            href={`https://www.google.com/search?q=${symbol}+stock+news`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors duration-200"
          >
            <span className="text-gray-700">Recent News</span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
          <a 
            href={`https://www.sec.gov/cgi-bin/browse-edgar?CIK=${symbol}&Find=Search&owner=exclude&action=getcompany`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors duration-200"
          >
            <span className="text-gray-700">SEC Filings</span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
