from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os
from database.db_init import init_db, get_db
from routes.auth_routes import auth_bp
from routes.marketplace_routes import marketplace_bp
from routes.disease_routes import disease_bp
from routes.chatbot_routes import chatbot_bp

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-change-this-in-production'
app.config['DATABASE'] = 'agri_predict.db'

# Enable CORS for React Native app
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Initialize database
with app.app_context():
    init_db()

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(marketplace_bp, url_prefix='/api/marketplace')
app.register_blueprint(disease_bp, url_prefix='/api/disease')
app.register_blueprint(chatbot_bp, url_prefix='/api/chatbot')

@app.route('/')
def index():
    return jsonify({
        'message': 'Agri-Predict Backend API',
        'version': '1.0.0',
        'status': 'running',
        'endpoints': {
            'auth': '/api/auth/*',
            'marketplace': '/api/marketplace/*',
            'disease': '/api/disease/*',
            'chatbot': '/api/chatbot/*'
        }
    })

@app.route('/health')
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'database': 'connected'
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Run on all interfaces so it's accessible from mobile device
    app.run(host='0.0.0.0', port=5001, debug=True)
