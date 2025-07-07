export const formatCurrency = (value, abbreviated = false) => {
  if (value == null) return 'N/A';
  
  const num = parseFloat(value);
  
  if (abbreviated && num >= 1e12) {
    return `$${(num / 1e12).toFixed(2)}T`;
  } else if (abbreviated && num >= 1e9) {
    return `$${(num / 1e9).toFixed(2)}B`;
  } else if (abbreviated && num >= 1e6) {
    return `$${(num / 1e6).toFixed(2)}M`;
  } else if (abbreviated && num >= 1e3) {
    return `$${(num / 1e3).toFixed(2)}K`;
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

export const formatNumber = (value, abbreviated = true) => {
  if (value == null) return 'N/A';
  
  const num = parseFloat(value);
  
  if (abbreviated && num >= 1e9) {
    return `${(num / 1e9).toFixed(1)}B`;
  } else if (abbreviated && num >= 1e6) {
    return `${(num / 1e6).toFixed(1)}M`;
  } else if (abbreviated && num >= 1e3) {
    return `${(num / 1e3).toFixed(1)}K`;
  }
  
  return new Intl.NumberFormat('en-US').format(num);
};
