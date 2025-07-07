import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-full py-12">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Analyzing Stock Data
        </h3>
        <p className="text-gray-500">
          Getting latest prices and generating narrative...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
