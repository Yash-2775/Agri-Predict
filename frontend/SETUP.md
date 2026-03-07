# 🎯 SETUP INSTRUCTIONS - READ THIS FIRST!

## ⚡ Quick Setup (5 Minutes)

### Step 1: Install Dependencies
```bash
cd agri-predict-app
npm install
```
*Wait for installation to complete...*

### Step 2: Get Your FREE Gemini API Key

1. **Visit:** https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Click:** "Create API Key" button
4. **Copy** the generated key (looks like: AIzaSyC...)

### Step 3: Add API Key to App

1. **Open** the file: `src/components/Chatbot.tsx`
2. **Find** line 12 (near the top)
3. **Replace** this:
   ```typescript
   const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
   ```
   
   **With** your actual key:
   ```typescript
   const GEMINI_API_KEY = 'AIzaSyC_paste_your_key_here';
   ```

4. **Save** the file

### Step 4: Run the App!
```bash
npm start
```

Then choose:
- **Android Emulator:** Press `a`
- **iOS Simulator:** Press `i`  
- **Physical Device:** Scan QR code with Expo Go app

## ✅ Verify Everything Works

1. **Login Screen** should appear
2. **Register** a new account (any email format works)
3. **Navigate** to all 4 tabs:
   - 🛒 Market
   - 🌿 Disease
   - 🤖 AI Assistant (NEW!)
   - 📋 Schemes

4. **Test AI Chatbot:**
   - Click "AI Assistant" tab
   - Type: "What fertilizer for wheat?"
   - Should get response in ~3-5 seconds

5. **Try Language Switch:**
   - Click language button (EN/HI/MR) in header
   - Chatbot should respond in selected language

## 🎨 What You'll See

### Home Screen (After Login)
```
┌────────────────────────────┐
│ 🌾 Agri-Predict  EN Logout│
├────────────────────────────┤
│                            │
│   [Marketplace Products]   │
│                            │
├────────────────────────────┤
│ 🛒    🌿    🤖    📋     │
│Market Disease AI  Schemes  │
└────────────────────────────┘
```

### AI Chatbot Screen
```
┌────────────────────────────┐
│ 🤖 AI Farm Assistant   EN │
│    Powered by AI           │
├────────────────────────────┤
│ 🌾 Bot: Welcome! Ask me    │
│         anything...        │
│                            │
│     👨‍🌾 You: Question here │
│                            │
│ 🌾 Bot: Detailed answer... │
├────────────────────────────┤
│ [Type message...]  [Send] │
└────────────────────────────┘
```

## 📱 Download Expo Go (For Physical Device)

**Android:** https://play.google.com/store/apps/details?id=host.exp.exponent
**iOS:** https://apps.apple.com/app/expo-go/id982107779

## 🔥 Features You Can Try

### 1. Marketplace (🛒 Tab)
- Browse products
- Switch between Buy/Sell
- Filter by category
- Search products
- List your own products

### 2. Disease Detection (🌿 Tab)
- Upload crop image
- Get disease diagnosis
- View treatment recommendations
- See prevention tips

### 3. AI Assistant (🤖 Tab) ⭐ NEW!
- Ask farming questions
- Get expert advice
- Switch languages (EN/HI/MR)
- Real-time AI responses
- Beautiful chat interface

**Try asking:**
- "How to grow tomatoes?"
- "Best fertilizer for rice?"
- "Pest control for cotton?"
- "Government schemes for farmers?"

### 4. Schemes (📋 Tab)
- Browse government schemes
- Search by keyword
- View eligibility criteria
- Access official links

## 🌐 Language Support

**Available Languages:**
- 🇬🇧 English (EN)
- 🇮🇳 Hindi (HI)
- 🇮🇳 Marathi (MR)

**To Switch:**
- Tap language button in header
- All UI and chatbot responses change

## ⚠️ Troubleshooting

### "Cannot find module" error?
```bash
rm -rf node_modules
npm install
```

### Chatbot not working?
- Check if you added API key correctly
- Verify internet connection
- Look for errors in console

### App won't start?
```bash
expo start -c  # Clear cache
```

### Expo Go not connecting?
- Make sure phone and computer on same WiFi
- Try restarting expo server
- Check firewall settings

## 📚 Documentation Files

Read these for more info:
- **README.md** - Full documentation
- **QUICKSTART.md** - Quick start guide
- **VISUAL_GUIDE.md** - UI/UX details
- **IMPORTANT_NOTES.md** - Key changes & notes

## 🎯 What's Different from Original

### Removed:
❌ Water Level Monitor screen
❌ ESP32 water sensor integration

### Added:
✅ AI-powered Chatbot with Gemini
✅ Beautiful chat interface
✅ Smooth animations
✅ Better multilingual support
✅ Modern UI design

### Navigation Changed:
```
BEFORE: Market | Disease | Water  | Schemes
AFTER:  Market | Disease | AI Bot | Schemes
```

## 🚀 Ready to Go!

Your app is now configured with:
- ✅ Modern React Native codebase
- ✅ AI-powered chatbot
- ✅ Multi-language support
- ✅ Beautiful UI/UX
- ✅ All necessary dependencies

## 💡 Pro Tips

1. **Test on real device** - Better performance
2. **Try all languages** - See full translation
3. **Ask complex questions** - AI is smart!
4. **Explore all features** - Lots to discover
5. **Check console** - For debugging

## 🎓 Learning Path

Want to customize?
1. Start with: `src/constants/index.ts` (add translations)
2. Then: `src/styles/index.ts` (change colors)
3. Finally: `src/components/` (modify UI)

## 🆘 Need Help?

1. Check error message
2. Read documentation
3. Search Expo docs
4. Check API key is correct
5. Restart everything

## ✨ Enjoy Your App!

You now have a complete farming assistant with:
- Smart marketplace
- Disease detection
- AI chatbot in 3 languages
- Government schemes info

**Perfect for helping farmers! 🌾**

---

**Questions? Check the other documentation files!**
**Ready? Run `npm start` and enjoy! 🚀**
