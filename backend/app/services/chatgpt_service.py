import openai
from flask import current_app
import json

class ChatGPTService:
    def __init__(self):
        self.client = None
    
    def _get_client(self):
        if not self.client:
            openai.api_key = current_app.config['OPENAI_API_KEY']
            self.client = openai.OpenAI(api_key=current_app.config['OPENAI_API_KEY'])
        return self.client
    
    def company_name_to_ticker(self, company_name):
        try:
            client = self._get_client()
            
            prompt = f"""
            Convert the company name "{company_name}" to its stock ticker symbol.
            
            Rules:
            - Return only the ticker symbol (e.g., AAPL, MSFT, GOOGL)
            - If multiple tickers exist, return the most common one
            - If company not found, return "NOT_FOUND"
            - Return only the ticker, no explanation
            
            Company name: {company_name}
            Ticker symbol:
            """
            
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=10,
                temperature=0
            )
            
            ticker = response.choices[0].message.content.strip().upper()
            
            return ticker if ticker != "NOT_FOUND" else None
        
        except Exception as e:
            print(f"Error in company name to ticker conversion: {e}")
            return None
    
    def generate_simple_narrative(self, stock_data):
        try:
            client = self._get_client()
            
            symbol = stock_data['symbol']
            name = stock_data['name']
            change = stock_data['change']
            change_percent = stock_data['change_percent']
            direction = stock_data['direction']
            
            prompt = f"""
            Write a simple, non-technical explanation for why {name} ({symbol}) stock moved {direction} by {change_percent:.2f}% (${change:.2f}).
            
            Requirements:
            - Use simple, everyday language (no financial jargon)
            - Explain in terms a non-investor would understand
            - Keep it to 2-3 sentences maximum
            - Focus on the most likely business reasons
            - Be specific to the company and realistic
            
            Stock: {name} ({symbol})
            Movement: {direction} {abs(change_percent):.2f}%
            
            Simple explanation:
            """
            
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=150,
                temperature=0.7
            )
            
            return response.choices[0].message.content.strip()
        
        except Exception as e:
            print(f"Error generating narrative: {e}")
            return f"The stock moved {direction} by {abs(change_percent):.2f}% due to recent market activity."

