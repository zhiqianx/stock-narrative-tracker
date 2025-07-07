from app.services.chatgpt_service import ChatGPTService

class NarrativeService:
    def __init__(self):
        self.chatgpt_service = ChatGPTService()
    
    def generate_narrative(self, stock_data):
        # Generate main narrative
        narrative = self.chatgpt_service.generate_simple_narrative(stock_data)
        
        # Generate key factors based on stock symbol and direction
        key_factors = self._generate_key_factors(stock_data)
        
        # Determine sentiment
        sentiment = 'positive' if stock_data['direction'] == 'up' else 'negative'
        
        return {
            'narrative': narrative,
            'key_factors': key_factors,
            'sentiment': sentiment
        }
    
    def _generate_key_factors(self, stock_data):
        symbol = stock_data['symbol']
        direction = stock_data['direction']
        
        # Default factors for common stocks
        factors_map = {
            'AAPL': {
                'up': ['📱 Strong iPhone sales', '🤖 AI developments', '💰 Revenue growth'],
                'down': ['📱 iPhone sales decline', '🏭 Supply chain issues', '📊 Market concerns']
            },
            'MSFT': {
                'up': ['☁️ Cloud growth', '🤖 AI integration', '🏢 Enterprise demand'],
                'down': ['☁️ Cloud competition', '📉 Missed expectations', '🏢 Enterprise caution']
            },
            'GOOGL': {
                'up': ['📺 YouTube ad growth', '🤖 AI advances', '💰 Cost cutting'],
                'down': ['📺 Ad revenue decline', '🔍 Search competition', '📊 Regulatory concerns']
            },
            'AMZN': {
                'up': ['🛒 E-commerce growth', '☁️ AWS expansion', '📦 Logistics efficiency'],
                'down': ['🛒 Retail slowdown', '☁️ Cloud competition', '📦 High logistics costs']
            },
            'TSLA': {
                'up': ['🚗 Strong deliveries', '🤖 FSD progress', '🏭 Production ramp'],
                'down': ['🚗 Delivery miss', '💰 Price cuts', '🏭 Production issues']
            }
        }
        
        if symbol in factors_map:
            return factors_map[symbol][direction]
        else:
            # Generic factors
            if direction == 'up':
                return ['📈 Positive earnings', '📰 Good news', '📊 Market optimism']
            else:
                return ['📉 Market concerns', '📰 Negative news', '📊 Investor caution']
