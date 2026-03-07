# 🚀 Quick Start Guide - Agri-Predict

Get your app running in 5 minutes!

## Step 1: Install Dependencies (2 minutes)

```bash
cd agri-predict-app
npm install
```

## Step 2: Get Gemini API Key (2 minutes)

1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your key (looks like: AIzaSyC...)

## Step 3: Configure the App (1 minute)

Open `src/components/Chatbot.tsx` and find line 12:

```typescript
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
```

Replace it with your actual key:

```typescript
const GEMINI_API_KEY = 'AIzaSyC_your_actual_key_here';
```

Save the file.

## Step 4: Run the App!

```bash
npm start
```

Then:
- Press `a` for Android emulator
- Press `i` for iOS simulator
- Or scan QR code with Expo Go app

## ✅ You're Done!

### Test the App:

1. **Register**: Create an account (use any email format)
2. **Explore Marketplace**: Browse products
3. **Try AI Chatbot**: Click the Assistant tab (🤖 icon)
4. **Ask Questions**: Try these in English, Hindi, or Marathi:
   - "What fertilizer should I use for wheat?"
   - "How do I prevent pest attacks?"
   - "Tell me about PM-KISAN scheme"

### Change Language:

Tap the language button (EN/HI/MR) in the header!

## 🎯 What Works Without Backend:

✅ AI Chatbot (Gemini AI)
✅ Marketplace browsing
✅ Product listing
✅ Government schemes info
✅ Multi-language support

## ⚠️ What Needs Backend:

❌ User authentication (currently mock)
❌ Disease detection (currently mock)
❌ Data persistence

## 🆘 Having Issues?

### App won't start?
```bash
# Clear cache and restart
expo start -c
```

### Chatbot shows error?
- Double-check your Gemini API key
- Make sure you have internet connection

### Dependencies error?
```bash
# Delete and reinstall
rm -rf node_modules
npm install
```

## 📱 Testing on Real Device:

1. Install "Expo Go" from Play Store/App Store
2. Run `npm start`
3. Scan QR code with your phone

## 🎉 Enjoy!

Your smart farming assistant is ready to help farmers with:
- 🌾 Crop advice
- 🐛 Pest management
- 💧 Irrigation tips
- 🌱 Fertilizer recommendations
- 📋 Government schemes
- And much more!

---

**Need help? Check README.md for detailed documentation.**
