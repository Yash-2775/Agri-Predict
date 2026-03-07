# 🚀 Quick Start Guide - Agri-Predict App

## Step-by-Step Setup (5 minutes)

### 1️⃣ Install Prerequisites

**Install Node.js:**
- Download from https://nodejs.org/ (LTS version)
- Verify installation: `node --version`

**Install Expo CLI:**
```bash
npm install -g expo-cli
```

### 2️⃣ Install Expo Go on Your Phone

- **Android**: https://play.google.com/store/apps/details?id=host.exp.exponent
- **iOS**: https://apps.apple.com/app/expo-go/id982107779

### 3️⃣ Setup Project

```bash
# Navigate to project directory
cd agri-predict-app

# Install dependencies
npm install

# This might take 2-3 minutes
```

### 4️⃣ Start Development Server

```bash
npm start
```

A QR code will appear in your terminal.

### 5️⃣ Run on Your Phone

1. Open **Expo Go** app on your phone
2. Scan the QR code from terminal
3. Wait for the app to load (first time takes 1-2 minutes)
4. Done! 🎉

## 🔧 Configuration for Full Features

### Without Backend (Limited Features)
- ✅ Marketplace works
- ✅ Government Schemes work
- ✅ UI and navigation work
- ❌ AI Chatbot won't respond (will show error)
- ❌ Disease Detection won't work

### With Backend (Full Features)

**Option 1: Local Development**
1. Start your backend server on your computer
2. Find your computer's IP address:
   - Windows: `ipconfig` → Look for IPv4 Address
   - Mac/Linux: `ifconfig` → Look for inet address
3. Update `src/services/apiService.ts`:
   ```typescript
   const API_BASE_URL = 'http://YOUR_IP_ADDRESS:5001';
   ```
   Example: `'http://192.168.1.100:5001'`

**Option 2: Cloud Backend (Recommended)**
1. Deploy backend to Railway, Render, or Heroku
2. Update `src/services/apiService.ts`:
   ```typescript
   const API_BASE_URL = 'https://your-app.railway.app';
   ```

## 📱 Test Credentials

For testing, you can use:
- **Email**: test@farmer.com
- **Password**: test123

Or create a new account through the registration screen.

## 🎯 Main Features to Test

1. **Login/Register** → Create account with any email
2. **Marketplace** → Browse products, try to sell items
3. **AI Chatbot** → Ask questions (needs backend)
4. **Disease Detection** → Upload crop images (needs backend)
5. **Government Schemes** → Browse schemes
6. **Language Switch** → Click language button in header (EN/HI/MR)

## 🎨 Unique Design Elements

### Navigation
- **Bottom Navigation**: 4 main screens
- **Floating Button**: Quick AI assistant access
- **Modal Chat**: Fullscreen chat experience

### AI Chatbot Design
- **Modern UI**: Avatar-based conversations
- **Animations**: Smooth message transitions
- **Quick Actions**: Suggested queries
- **Timestamps**: Professional chat experience
- **Typing Indicators**: Real-time feedback

### Color Scheme
- Primary: Agricultural Green (#16a34a)
- Secondary: Sky Blue (#0ea5e9)
- Accent: Amber (#f59e0b)

## ⚡ Performance Tips

1. **First Load**: Takes 1-2 minutes
2. **Subsequent Loads**: 10-20 seconds
3. **Hot Reload**: Automatic when you save files
4. **Clear Cache**: Shake phone → "Reload"

## 🐛 Common Issues & Fixes

### "Network Error" in Chatbot
→ Backend not running or wrong URL

### "Cannot connect to Metro"
→ Ensure phone and computer on same WiFi

### App won't load
→ Clear Expo cache: `expo start -c`

### Images not uploading
→ Grant camera/photo permissions in phone settings

## 📊 Screen Overview

1. **Marketplace** (🛒)
   - Browse products
   - Search & filter
   - Switch between Buy/Sell tabs

2. **Disease Detection** (🌿)
   - Upload crop images
   - View disease analysis
   - Get treatment recommendations

3. **AI Chatbot** (🤖)
   - Ask farming questions
   - Get expert advice
   - Multilingual support

4. **Government Schemes** (📋)
   - Browse schemes
   - Search schemes
   - View eligibility & benefits

## 🌍 Language Support

Switch languages anytime:
- **EN** → English
- **HI** → हिंदी (Hindi)
- **MR** → मराठी (Marathi)

All text, buttons, and content automatically updates!

## 🔄 Development Workflow

```bash
# Start development server
npm start

# Clear cache and restart
expo start -c

# Run on Android emulator
npm run android

# Run on iOS simulator (Mac only)
npm run ios
```

## 📦 Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build APK for Android
eas build --platform android --profile preview

# Build for iOS
eas build --platform ios
```

## 💡 Pro Tips

1. **Shake your phone** to open developer menu
2. **Double tap R** to reload app
3. **Enable Hot Reload** for instant updates while coding
4. **Use React DevTools** for debugging
5. **Test on real device** for best performance

## 📞 Need Help?

1. Check README.md for detailed information
2. Review error messages carefully
3. Check Expo documentation: https://docs.expo.dev
4. Verify all dependencies are installed
5. Ensure backend is running (for full features)

## ✅ Checklist Before Testing

- [ ] Node.js installed
- [ ] Expo Go app installed on phone
- [ ] Dependencies installed (`npm install`)
- [ ] Development server running (`npm start`)
- [ ] Phone and computer on same WiFi
- [ ] Backend running (optional, for full features)

## 🎉 You're Ready!

Open the app and explore all features. The app works great even without a backend for marketplace and schemes features!

---

**Happy Farming! 🌾**
