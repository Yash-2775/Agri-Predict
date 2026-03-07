from flask import Blueprint, request, jsonify, g
from database.db_init import get_db
import base64
import os
from datetime import datetime

disease_bp = Blueprint('disease', __name__)

@disease_bp.teardown_app_request
def teardown_db(exception):
    from database.db_init import close_db
    close_db(exception)

# Sample disease database (in production, use ML model)
DISEASE_DATABASE = {
    'tomato_leaf_blight': {
        'name': 'Tomato Late Blight',
        'treatments': [
            'Apply copper-based fungicides',
            'Remove infected leaves immediately',
            'Improve air circulation',
            'Water at soil level, not on leaves'
        ],
        'preventions': [
            'Use resistant varieties',
            'Practice crop rotation',
            'Maintain proper spacing',
            'Avoid overhead irrigation'
        ]
    },
    'wheat_rust': {
        'name': 'Wheat Rust',
        'treatments': [
            'Apply fungicides (Propiconazole)',
            'Remove infected plants',
            'Use sulfur-based sprays'
        ],
        'preventions': [
            'Plant resistant varieties',
            'Early planting',
            'Proper fertilization',
            'Remove volunteer wheat plants'
        ]
    },
    'rice_blast': {
        'name': 'Rice Blast',
        'treatments': [
            'Apply Tricyclazole fungicide',
            'Use Carbendazim spray',
            'Drain water from field'
        ],
        'preventions': [
            'Use certified disease-free seeds',
            'Balanced fertilization',
            'Proper water management',
            'Field sanitation'
        ]
    }
}

@disease_bp.route('/detect', methods=['POST'])
def detect_disease():
    """Detect disease from crop image"""
    try:
        data = request.get_json()
        
        if 'image' not in data:
            return jsonify({'success': False, 'error': 'Image data required'}), 400
        
        user_id = data.get('user_id')
        image_base64 = data['image']
        
        # In production, you would:
        # 1. Decode base64 image
        # 2. Run ML model for disease detection
        # 3. Get predictions with confidence scores
        
        # For now, simulate disease detection
        import random
        
        # Randomly select a disease for demo
        disease_key = random.choice(list(DISEASE_DATABASE.keys()))
        disease_info = DISEASE_DATABASE[disease_key]
        confidence = random.uniform(0.75, 0.98)
        
        result = {
            'disease_name': disease_info['name'],
            'confidence': confidence,
            'treatments': disease_info['treatments'],
            'preventions': disease_info['preventions'],
            'detected_at': datetime.now().isoformat()
        }
        
        # Save detection to database if user_id provided
        if user_id:
            db = get_db()
            cursor = db.cursor()
            
            cursor.execute('''
                INSERT INTO disease_detections 
                (user_id, disease_name, confidence, treatments, preventions)
                VALUES (?, ?, ?, ?, ?)
            ''', (
                user_id,
                disease_info['name'],
                confidence,
                '\n'.join(disease_info['treatments']),
                '\n'.join(disease_info['preventions'])
            ))
            
            db.commit()
        
        return jsonify({
            'success': True,
            'result': result
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@disease_bp.route('/history/<int:user_id>', methods=['GET'])
def get_detection_history(user_id):
    """Get disease detection history for a user"""
    try:
        db = get_db()
        cursor = db.cursor()
        
        cursor.execute('''
            SELECT * FROM disease_detections
            WHERE user_id = ?
            ORDER BY detected_at DESC
            LIMIT 20
        ''', (user_id,))
        
        detections = cursor.fetchall()
        
        history = []
        for d in detections:
            history.append({
                'id': d['id'],
                'disease_name': d['disease_name'],
                'confidence': d['confidence'],
                'treatments': d['treatments'].split('\n') if d['treatments'] else [],
                'preventions': d['preventions'].split('\n') if d['preventions'] else [],
                'detected_at': d['detected_at']
            })
        
        return jsonify({
            'success': True,
            'history': history,
            'count': len(history)
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@disease_bp.route('/diseases', methods=['GET'])
def get_all_diseases():
    """Get information about all known diseases"""
    try:
        diseases = []
        for key, info in DISEASE_DATABASE.items():
            diseases.append({
                'id': key,
                'name': info['name'],
                'treatments': info['treatments'],
                'preventions': info['preventions']
            })
        
        return jsonify({
            'success': True,
            'diseases': diseases,
            'count': len(diseases)
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
