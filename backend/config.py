import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    FLASK_ENV = os.environ.get('FLASK_ENV', 'development')
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:3000').split(',')

