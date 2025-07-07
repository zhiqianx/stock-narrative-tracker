import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta

class YahooFinanceService:
    def get_stock_data(self, symbol):
        try:
            stock = yf.Ticker(symbol)
            
            # Get current price and basic info
            info = stock.info
            history = stock.history(period="5d")
            
            if history.empty:
                return None
            
            current_price = history['Close'].iloc[-1]
            previous_close = history['Close'].iloc[-2] if len(history) > 1 else current_price
            
            change = current_price - previous_close
            change_percent = (change / previous_close) * 100
            
            return {
                'symbol': symbol,
                'name': info.get('longName', symbol),
                'price': round(current_price, 2),
                'change': round(change, 2),
                'change_percent': round(change_percent, 2),
                'direction': 'up' if change >= 0 else 'down',
                'volume': info.get('volume', 0),
                'market_cap': info.get('marketCap', 0),
                'previous_close': round(previous_close, 2)
            }
        
        except Exception as e:
            print(f"Error fetching stock data: {e}")
            return None
    
    def get_stock_history(self, symbol, days=30):
        try:
            stock = yf.Ticker(symbol)
            end_date = datetime.now()
            start_date = end_date - timedelta(days=days)
            
            history = stock.history(start=start_date, end=end_date)
            
            return {
                'symbol': symbol,
                'history': [
                    {
                        'date': date.strftime('%Y-%m-%d'),
                        'open': round(row['Open'], 2),
                        'high': round(row['High'], 2),
                        'low': round(row['Low'], 2),
                        'close': round(row['Close'], 2),
                        'volume': int(row['Volume'])
                    }
                    for date, row in history.iterrows()
                ]
            }
        
        except Exception as e:
            print(f"Error fetching stock history: {e}")
            return None
