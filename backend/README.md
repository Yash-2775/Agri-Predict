# 🌾 Agri-Predict Backend API

Flask-based REST API backend for the Agri-Predict mobile application with SQLite database.

## 📋 Features

- **User Authentication** - Register, login, profile management
- **Marketplace API** - CRUD operations for products
- **Disease Detection** - Image-based crop disease identification
- **AI Chatbot** - Multilingual farming assistant
- **Database** - SQLite with proper schema and relationships
- **CORS Enabled** - Works with React Native mobile app

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Navigate to backend directory**
```bash
cd agri-predict-backend
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Initialize database**
```bash
python database/db_init.py
```

4. **Run the server**
```bash
python app.py
```

Server will start on: `http://localhost:5001`

## 📡 API Endpoints

### Authentication (`/api/auth`)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "farmer1",
  "email": "farmer@example.com",
  "password": "secure123",
  "state": "Maharashtra",
  "city": "Mumbai"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "farmer@example.com",
  "password": "secure123"
}
```

#### Get Profile
```http
GET /api/auth/profile/<user_id>
```

### Marketplace (`/api/marketplace`)

#### Get All Products
```http
GET /api/marketplace/products
GET /api/marketplace/products?category=crops
GET /api/marketplace/products?search=wheat
```

#### Add Product
```http
POST /api/marketplace/products
Content-Type: application/json

{
  "user_id": 1,
  "category": "crops",
  "name": "Organic Wheat",
  "price": 25,
  "unit": "kg",
  "quantity": 500,
  "description": "High quality organic wheat"
}
```

#### Get User's Products
```http
GET /api/marketplace/my-products/<user_id>
```

#### Delete Product
```http
DELETE /api/marketplace/products/<product_id>?user_id=<user_id>
```

### Disease Detection (`/api/disease`)

#### Detect Disease
```http
POST /api/disease/detect
Content-Type: application/json

{
  "user_id": 1,
  "image": "base64_encoded_image_data"
}
```

#### Get Detection History
```http
GET /api/disease/history/<user_id>
```

#### Get All Known Diseases
```http
GET /api/disease/diseases
```

### Chatbot (`/api/chatbot`)

#### Send Message
```http
POST /api/chatbot/chat
Content-Type: application/json

{
  "user_id": 1,
  "message": "How to grow wheat?",
  "language": "en",
  "context": null
}
```

#### Get Chat History
```http
GET /api/chatbot/history/<user_id>
GET /api/chatbot/history/<user_id>?limit=20
```

#### Clear History
```http
DELETE /api/chatbot/clear-history/<user_id>
```

## 🗄️ Database Schema

### Users Table
```sql
- id (PRIMARY KEY)
- username (UNIQUE)
- email (UNIQUE)
- password_hash
- state
- city
- created_at
- updated_at
```

### Products Table
```sql
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- category
- name
- price
- image_url
- unit
- quantity
- expiry_date
- sell_or_rent
- description
- status
- created_at
- updated_at
```

### Disease Detections Table
```sql
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- image_url
- disease_name
- confidence
- treatments
- preventions
- detected_at
```

### Chat History Table
```sql
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- message
- response
- language
- created_at
```

### User Preferences Table
```sql
- id (PRIMARY KEY)
- user_id (FOREIGN KEY, UNIQUE)
- language
- notification_enabled
- theme
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file (copy from `.env.template`):

```bash
FLASK_ENV=development
SECRET_KEY=your-secret-key
DATABASE_NAME=agri_predict.db
GEMINI_API_KEY=your-gemini-api-key
PORT=5001
```

### Running on Network (for mobile testing)

The server runs on `0.0.0.0` by default, making it accessible from your mobile device:

1. Find your computer's IP address:
   - **Windows**: `ipconfig` → Look for IPv4 Address
   - **Mac/Linux**: `ifconfig` → Look for inet address

2. Update mobile app's `apiService.ts`:
   ```typescript
   const API_BASE_URL = 'http://YOUR_COMPUTER_IP:5001/api';
   ```

## 📱 Mobile App Integration

Update the React Native app's API service:

**File:** `src/services/apiService.ts`

```typescript
const API_BASE_URL = 'http://192.168.1.100:5001/api'; // Your IP
```

Test endpoints:
- ✅ Register: `/api/auth/register`
- ✅ Login: `/api/auth/login`
- ✅ Products: `/api/marketplace/products`
- ✅ Disease: `/api/disease/detect`
- ✅ Chat: `/api/chatbot/chat`

## 🧪 Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:5001/health

# Register user
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123","state":"Maharashtra","city":"Mumbai"}'

# Get products
curl http://localhost:5001/api/marketplace/products
```

### Using Python

```python
import requests

# Register
response = requests.post('http://localhost:5001/api/auth/register', json={
    'username': 'farmer1',
    'email': 'farmer1@example.com',
    'password': 'password123',
    'state': 'Maharashtra',
    'city': 'Mumbai'
})
print(response.json())
```

## 🔒 Security Notes

### For Production:

1. **Change SECRET_KEY** - Use strong random key
2. **Enable HTTPS** - Use SSL/TLS certificates
3. **Use PostgreSQL** - Instead of SQLite for production
4. **Add Rate Limiting** - Prevent abuse
5. **Add Input Validation** - Sanitize all inputs
6. **Use JWT Tokens** - For authentication
7. **Environment Variables** - Never commit `.env` file

## 📁 Project Structure

```
agri-predict-backend/
├── app.py                  # Main Flask application
├── requirements.txt        # Python dependencies
├── .env.template          # Environment variables template
├── agri_predict.db        # SQLite database (auto-generated)
├── database/
│   └── db_init.py         # Database initialization
├── routes/
│   ├── auth_routes.py     # Authentication endpoints
│   ├── marketplace_routes.py  # Marketplace endpoints
│   ├── disease_routes.py  # Disease detection endpoints
│   └── chatbot_routes.py  # Chatbot endpoints
├── models/                # (Future: ML models)
└── utils/                 # (Future: Helper functions)
```

## 🚀 Deployment Options

### Option 1: Heroku (Free Tier Available)
```bash
# Install Heroku CLI
# Login: heroku login
heroku create agri-predict-api
git push heroku main
```

### Option 2: Railway.app (Recommended)
1. Visit: https://railway.app
2. Connect GitHub repository
3. Deploy automatically

### Option 3: Render.com (Free Tier)
1. Visit: https://render.com
2. Create new Web Service
3. Connect repository
4. Deploy

### Option 4: PythonAnywhere (Free Tier)
1. Visit: https://www.pythonanywhere.com
2. Upload files
3. Configure WSGI
4. Run

## 🐛 Troubleshooting

### Database Issues
```bash
# Reset database
rm agri_predict.db
python database/db_init.py
```

### Port Already in Use
```bash
# Change port in app.py
app.run(host='0.0.0.0', port=5002)  # Use different port
```

### CORS Errors
- Check if CORS is enabled in `app.py`
- Verify allowed origins
- Check mobile app URL configuration

### Module Not Found
```bash
# Reinstall dependencies
pip install -r requirements.txt
```

## 📊 Database Management

### View Database
```bash
# Install SQLite browser
sqlite3 agri_predict.db

# List tables
.tables

# View users
SELECT * FROM users;

# View products
SELECT * FROM products;
```

### Backup Database
```bash
# Create backup
cp agri_predict.db agri_predict_backup.db

# Restore backup
cp agri_predict_backup.db agri_predict.db
```

## 🔄 Adding New Features

### Add New Route
1. Create new file in `routes/`
2. Define Blueprint
3. Add endpoints
4. Register in `app.py`

Example:
```python
# routes/new_feature.py
from flask import Blueprint

new_bp = Blueprint('new_feature', __name__)

@new_bp.route('/endpoint')
def my_endpoint():
    return jsonify({'success': True})

# app.py
from routes.new_feature import new_bp
app.register_blueprint(new_bp, url_prefix='/api/new')
```

## 📝 API Response Format

All endpoints return JSON in this format:

**Success:**
```json
{
  "success": true,
  "data": {...},
  "message": "Optional message"
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error description"
}
```

## 🎯 Next Steps

1. ✅ Set up backend server
2. ✅ Initialize database
3. ✅ Test API endpoints
4. ⬜ Integrate with mobile app
5. ⬜ Add ML model for disease detection
6. ⬜ Deploy to cloud
7. ⬜ Add real-time features (WebSockets)

## 📞 Support

For issues:
- Check logs in terminal
- Verify database exists
- Check Python version (3.8+)
- Ensure all dependencies installed

---

**Backend ready! Connect your mobile app and start farming! 🌾**
