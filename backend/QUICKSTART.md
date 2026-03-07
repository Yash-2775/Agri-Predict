# ⚡ Backend Quick Setup Guide

## 🎯 Get Backend Running in 3 Minutes!

### Step 1: Install Python Dependencies (1 min)
```bash
cd agri-predict-backend
pip install -r requirements.txt
```

### Step 2: Initialize Database (30 seconds)
```bash
python database/db_init.py
```

You should see: `✅ Database initialized successfully!`

### Step 3: Run the Server (30 seconds)
```bash
python app.py
```

You should see:
```
* Running on http://0.0.0.0:5001
* Running on http://192.168.x.x:5001  <-- Use this IP for mobile!
```

### Step 4: Test It Works (1 min)

Open browser and visit: `http://localhost:5001`

You should see:
```json
{
  "message": "Agri-Predict Backend API",
  "status": "running"
}
```

## ✅ You're Done!

Your backend is now running on port 5001!

## 📱 Connect Mobile App

1. **Find your IP address:**
   - **Windows:** Open CMD → type `ipconfig` → Look for "IPv4 Address"
   - **Mac:** Open Terminal → type `ifconfig` → Look for "inet"
   - **Linux:** Open Terminal → type `hostname -I`

2. **Update mobile app:**
   
   Open: `agri-predict-app/src/services/apiService.ts`
   
   Change line 8:
   ```typescript
   const API_BASE_URL = 'http://YOUR_IP_HERE:5001/api';
   ```
   
   Example:
   ```typescript
   const API_BASE_URL = 'http://192.168.1.100:5001/api';
   ```

3. **Restart mobile app:**
   ```bash
   npm start
   ```

## 🧪 Quick Test

Test the API with cURL:

```bash
# Health check
curl http://localhost:5001/health

# Register a user
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123","state":"Maharashtra","city":"Mumbai"}'

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

## 📊 Check Database

```bash
# View database
sqlite3 agri_predict.db

# Inside SQLite:
.tables              # List all tables
SELECT * FROM users; # View users
.exit                # Exit SQLite
```

## 🔥 Available Endpoints

Once running, you can use:

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - User login
- `GET /api/marketplace/products` - Get products
- `POST /api/marketplace/products` - Add product
- `POST /api/disease/detect` - Detect disease
- `POST /api/chatbot/chat` - Chat with bot

## 🐛 Common Issues

### Issue: "Module not found"
**Solution:**
```bash
pip install -r requirements.txt
```

### Issue: "Port 5001 already in use"
**Solution:**
Kill the process or change port in `app.py` line 50:
```python
app.run(host='0.0.0.0', port=5002)  # Change to 5002
```

### Issue: "Database locked"
**Solution:**
```bash
rm agri_predict.db
python database/db_init.py
```

### Issue: "Cannot connect from mobile"
**Solution:**
1. Make sure phone and computer on same WiFi
2. Check firewall allows port 5001
3. Use correct IP address (not localhost)

## 💡 Pro Tips

1. **Keep terminal open** - Backend must run while testing app
2. **Check logs** - Terminal shows all API requests
3. **Auto-reload** - Backend restarts on code changes (debug mode)
4. **Test first** - Test endpoints before connecting mobile app

## 🎓 What You Have Now

- ✅ Flask REST API server
- ✅ SQLite database with 5 tables
- ✅ User authentication
- ✅ Marketplace CRUD operations
- ✅ Disease detection system
- ✅ Chatbot with multilingual support
- ✅ CORS enabled for mobile app

## 🚀 Next Steps

1. Test all endpoints with cURL
2. Connect mobile app
3. Create test user
4. Add some products
5. Try disease detection
6. Test chatbot

## 📞 Need Help?

Check the full README.md for:
- Complete API documentation
- Deployment guides
- Advanced configuration
- Troubleshooting tips

---

**Backend is ready! Time to connect your mobile app! 🌾**
