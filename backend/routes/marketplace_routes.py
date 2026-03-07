from flask import Blueprint, request, jsonify, g
from database.db_init import get_db
import json

marketplace_bp = Blueprint('marketplace', __name__)

@marketplace_bp.teardown_app_request
def teardown_db(exception):
    from database.db_init import close_db
    close_db(exception)

@marketplace_bp.route('/products', methods=['GET'])
def get_products():
    """Get all active products"""
    try:
        category = request.args.get('category')
        search = request.args.get('search')
        
        db = get_db()
        cursor = db.cursor()
        
        query = '''
            SELECT p.*, u.username as seller_name, u.city, u.state
            FROM products p
            JOIN users u ON p.user_id = u.id
            WHERE p.status = 'active'
        '''
        params = []
        
        if category and category != 'all':
            query += ' AND p.category = ?'
            params.append(category)
        
        if search:
            query += ' AND (p.name LIKE ? OR p.description LIKE ?)'
            params.extend([f'%{search}%', f'%{search}%'])
        
        query += ' ORDER BY p.created_at DESC'
        
        cursor.execute(query, params)
        products = cursor.fetchall()
        
        products_list = []
        for p in products:
            products_list.append({
                'id': p['id'],
                'category': p['category'],
                'name': p['name'],
                'price': p['price'],
                'image': p['image_url'] or 'https://via.placeholder.com/400x300?text=Product',
                'unit': p['unit'],
                'quantity': p['quantity'],
                'expiryDate': p['expiry_date'],
                'sellOrRent': p['sell_or_rent'],
                'description': p['description'],
                'seller': {
                    'name': p['seller_name'],
                    'location': f"{p['city']}, {p['state']}"
                },
                'createdAt': p['created_at']
            })
        
        return jsonify({
            'success': True,
            'products': products_list,
            'count': len(products_list)
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@marketplace_bp.route('/products', methods=['POST'])
def add_product():
    """Add a new product"""
    try:
        data = request.get_json()
        
        # Required fields
        required = ['user_id', 'category', 'name', 'price']
        for field in required:
            if field not in data:
                return jsonify({'success': False, 'error': f'Missing field: {field}'}), 400
        
        user_id = data['user_id']
        category = data['category']
        name = data['name']
        price = data['price']
        image_url = data.get('image_url', '')
        unit = data.get('unit', '')
        quantity = data.get('quantity')
        expiry_date = data.get('expiry_date')
        sell_or_rent = data.get('sell_or_rent', 'sell')
        description = data.get('description', '')
        
        db = get_db()
        cursor = db.cursor()
        
        cursor.execute('''
            INSERT INTO products 
            (user_id, category, name, price, image_url, unit, quantity, 
             expiry_date, sell_or_rent, description, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
        ''', (user_id, category, name, price, image_url, unit, quantity,
              expiry_date, sell_or_rent, description))
        
        product_id = cursor.lastrowid
        db.commit()
        
        return jsonify({
            'success': True,
            'message': 'Product added successfully',
            'product_id': product_id
        }), 201
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@marketplace_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get single product details"""
    try:
        db = get_db()
        cursor = db.cursor()
        
        cursor.execute('''
            SELECT p.*, u.username, u.email, u.city, u.state
            FROM products p
            JOIN users u ON p.user_id = u.id
            WHERE p.id = ?
        ''', (product_id,))
        
        product = cursor.fetchone()
        
        if not product:
            return jsonify({'success': False, 'error': 'Product not found'}), 404
        
        return jsonify({
            'success': True,
            'product': {
                'id': product['id'],
                'category': product['category'],
                'name': product['name'],
                'price': product['price'],
                'image': product['image_url'],
                'unit': product['unit'],
                'quantity': product['quantity'],
                'expiryDate': product['expiry_date'],
                'sellOrRent': product['sell_or_rent'],
                'description': product['description'],
                'status': product['status'],
                'seller': {
                    'username': product['username'],
                    'email': product['email'],
                    'location': f"{product['city']}, {product['state']}"
                },
                'createdAt': product['created_at']
            }
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@marketplace_bp.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Delete/deactivate a product"""
    try:
        user_id = request.args.get('user_id')
        
        if not user_id:
            return jsonify({'success': False, 'error': 'User ID required'}), 400
        
        db = get_db()
        cursor = db.cursor()
        
        # Check if product belongs to user
        cursor.execute('SELECT user_id FROM products WHERE id = ?', (product_id,))
        product = cursor.fetchone()
        
        if not product:
            return jsonify({'success': False, 'error': 'Product not found'}), 404
        
        if product['user_id'] != int(user_id):
            return jsonify({'success': False, 'error': 'Unauthorized'}), 403
        
        # Soft delete - mark as inactive
        cursor.execute('''
            UPDATE products 
            SET status = 'inactive', updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (product_id,))
        
        db.commit()
        
        return jsonify({
            'success': True,
            'message': 'Product deleted successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@marketplace_bp.route('/my-products/<int:user_id>', methods=['GET'])
def get_user_products(user_id):
    """Get all products by a specific user"""
    try:
        db = get_db()
        cursor = db.cursor()
        
        cursor.execute('''
            SELECT * FROM products 
            WHERE user_id = ? AND status = 'active'
            ORDER BY created_at DESC
        ''', (user_id,))
        
        products = cursor.fetchall()
        
        products_list = []
        for p in products:
            products_list.append({
                'id': p['id'],
                'category': p['category'],
                'name': p['name'],
                'price': p['price'],
                'image': p['image_url'],
                'unit': p['unit'],
                'quantity': p['quantity'],
                'status': p['status'],
                'createdAt': p['created_at']
            })
        
        return jsonify({
            'success': True,
            'products': products_list,
            'count': len(products_list)
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
