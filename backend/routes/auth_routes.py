from flask import Blueprint, request, jsonify, current_app, g
from werkzeug.security import generate_password_hash, check_password_hash
from database.db_init import get_db
import sqlite3

auth_bp = Blueprint('auth', __name__)

@auth_bp.teardown_app_request
def teardown_db(exception):
    from database.db_init import close_db
    close_db(exception)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['username', 'email', 'password', 'state', 'city']
        for field in required_fields:
            if field not in data:
                return jsonify({'success': False, 'error': f'Missing required field: {field}'}), 400
        
        username = data['username']
        email = data['email']
        password = data['password']
        state = data['state']
        city = data['city']
        
        # Hash password
        password_hash = generate_password_hash(password)
        
        db = get_db()
        cursor = db.cursor()
        
        try:
            # Insert user
            cursor.execute('''
                INSERT INTO users (username, email, password_hash, state, city)
                VALUES (?, ?, ?, ?, ?)
            ''', (username, email, password_hash, state, city))
            
            user_id = cursor.lastrowid
            
            # Create default preferences
            cursor.execute('''
                INSERT INTO user_preferences (user_id, language)
                VALUES (?, 'en')
            ''', (user_id,))
            
            db.commit()
            
            return jsonify({
                'success': True,
                'message': 'User registered successfully',
                'user_id': user_id
            }), 201
            
        except sqlite3.IntegrityError as e:
            if 'username' in str(e):
                return jsonify({'success': False, 'error': 'Username already exists'}), 400
            elif 'email' in str(e):
                return jsonify({'success': False, 'error': 'Email already exists'}), 400
            else:
                return jsonify({'success': False, 'error': 'Registration failed'}), 400
                
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.get_json()
        
        if 'email' not in data or 'password' not in data:
            return jsonify({'success': False, 'error': 'Email and password required'}), 400
        
        email = data['email']
        password = data['password']
        
        db = get_db()
        cursor = db.cursor()
        
        # Find user by email
        cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({'success': False, 'error': 'Invalid credentials'}), 401
        
        # Check password
        if not check_password_hash(user['password_hash'], password):
            return jsonify({'success': False, 'error': 'Invalid credentials'}), 401
        
        # Get user preferences
        cursor.execute('SELECT * FROM user_preferences WHERE user_id = ?', (user['id'],))
        prefs = cursor.fetchone()
        
        return jsonify({
            'success': True,
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'region': f"{user['city']}, {user['state']}",
                'state': user['state'],
                'city': user['city'],
                'language': prefs['language'] if prefs else 'en'
            }
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@auth_bp.route('/profile/<int:user_id>', methods=['GET'])
def get_profile(user_id):
    """Get user profile"""
    try:
        db = get_db()
        cursor = db.cursor()
        
        cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({'success': False, 'error': 'User not found'}), 404
        
        cursor.execute('SELECT * FROM user_preferences WHERE user_id = ?', (user_id,))
        prefs = cursor.fetchone()
        
        return jsonify({
            'success': True,
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'state': user['state'],
                'city': user['city'],
                'created_at': user['created_at'],
                'preferences': {
                    'language': prefs['language'] if prefs else 'en',
                    'notifications': prefs['notification_enabled'] if prefs else True,
                    'theme': prefs['theme'] if prefs else 'light'
                }
            }
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@auth_bp.route('/update-preferences', methods=['POST'])
def update_preferences():
    """Update user preferences"""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        language = data.get('language', 'en')
        
        if not user_id:
            return jsonify({'success': False, 'error': 'User ID required'}), 400
        
        db = get_db()
        cursor = db.cursor()
        
        cursor.execute('''
            UPDATE user_preferences 
            SET language = ?
            WHERE user_id = ?
        ''', (language, user_id))
        
        db.commit()
        
        return jsonify({
            'success': True,
            'message': 'Preferences updated'
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
