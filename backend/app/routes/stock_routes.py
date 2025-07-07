from flask import Blueprint, request, jsonify
from app.services.narrative_service import NarrativeService
from app.services.yahoo_finance_service import YahooFinanceService
from app.services.chatgpt_service import ChatGPTService

stock_bp = Blueprint('stock', __name__)
narrative_service = NarrativeService()
finance_service = YahooFinanceService()
chatgpt_service = ChatGPTService()

@stock_bp.route('/search/ticker/<symbol>', methods=['GET'])
def get_stock_by_ticker(symbol):
    try:
        # Get stock data from Yahoo Finance
        stock_data = finance_service.get_stock_data(symbol.upper())
        
        if not stock_data:
            return jsonify({'error': 'Stock not found'}), 404
        
        # Generate narrative using ChatGPT
        narrative_data = narrative_service.generate_narrative(stock_data)
        
        # Combine data
        result = {**stock_data, **narrative_data}
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@stock_bp.route('/search/company', methods=['POST'])
def search_by_company_name():
    try:
        data = request.get_json()
        company_name = data.get('company_name')
        
        if not company_name:
            return jsonify({'error': 'Company name is required'}), 400
        
        # Use ChatGPT to convert company name to ticker
        ticker = chatgpt_service.company_name_to_ticker(company_name)
        
        if not ticker:
            return jsonify({'error': 'Could not find ticker for company'}), 404
        
        # Get stock data using the ticker
        stock_data = finance_service.get_stock_data(ticker)
        
        if not stock_data:
            return jsonify({'error': 'Stock data not found'}), 404
        
        # Generate narrative
        narrative_data = narrative_service.generate_narrative(stock_data)
        
        result = {**stock_data, **narrative_data}
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@stock_bp.route('/stock/<symbol>/history', methods=['GET'])
def get_stock_history(symbol):
    try:
        days = request.args.get('days', 30, type=int)
        history = finance_service.get_stock_history(symbol.upper(), days)
        
        return jsonify(history)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
