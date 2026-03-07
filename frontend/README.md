# 🌾 Agri-Predict - Smart Farming Assistant

A comprehensive React Native mobile app for farmers with AI-powered features including crop disease detection, marketplace, multilingual chatbot, and government schemes information.

## ✨ Features

- **🛒 Marketplace**: Buy and sell crops, fertilizers, machinery, and chemicals
- **🌿 Disease Detection**: AI-powered crop disease identification using image recognition
- **🤖 AI Chatbot**: Multilingual farming assistant (English, Hindi, Marathi)
- **📋 Government Schemes**: Information about farming subsidies and programs
- **🌐 Multi-language Support**: English, Hindi, and Marathi
- **👤 User Authentication**: Secure login and registration

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android) or Xcode (for iOS)
- Google AI (Gemini) API Key

### Installation

1. **Clone or navigate to the project directory**

2. **Install dependencies**
```bash
npm install
```

3. **Configure API Keys**

Edit `src/components/Chatbot.tsx` and replace the API key:
```typescript
const GEMINI_API_KEY = 'your-actual-api-key-here';
```

Get your free Gemini API key from: https://makersuite.google.com/app/apikey

4. **Start the development server**
```bash
npm start
```

5. **Run on your device**
- Scan the QR code with Expo Go app (Android/iOS)
- Or press `a` for Android emulator
- Or press `i` for iOS simulator

## 📱 App Structure

```
agri-predict-app/
├── App.tsx                 # Main app entry point
├── src/
│   ├── components/         # React components
│   │   ├── Chatbot.tsx    # AI chatbot (replaced Water Monitor)
│   │   ├── CropDiseaseDetection.tsx
│   │   ├── GovernmentSchemes.tsx
│   │   ├── Header.tsx
│   │   ├── Login.tsx
│   │   ├── Marketplace.tsx
│   │   ├── Notification.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Register.tsx
│   │   └── SellForm.tsx
│   ├── constants/          # App constants and translations
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── styles/             # Global styles and themes
│   └── types/              # TypeScript type definitions
├── package.json
├── app.json
└── babel.config.js
```

## 🎨 Key Changes from Original

### What's New:
1. **Removed WaterLevelMonitor** - Replaced with dedicated AI Chatbot screen
2. **Enhanced Chatbot UI** - Beautiful, modern design with animations
3. **Integrated Google Gemini AI** - No backend required for chatbot
4. **Navigation Update** - Chatbot now has its own tab in bottom navigation
5. **Multilingual Support** - Full support for English, Hindi, and Marathi

### AI Chatbot Features:
- ✅ Works offline (after initial setup)
- ✅ No backend server required
- ✅ Multilingual responses
- ✅ Context-aware conversations
- ✅ Beautiful animated UI
- ✅ Typing indicators
- ✅ Message animations

## 🔧 Configuration

### Setting up Gemini AI (Required for Chatbot)

1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Copy the API key
4. Open `src/components/Chatbot.tsx`
5. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual key

```typescript
const GEMINI_API_KEY = 'AIzaSyC...'; // Your actual key
```

### Backend Setup (Optional - for Disease Detection & Auth)

If you want to use the disease detection and authentication features:

1. Set up your backend server
2. Update `src/services/apiService.ts`:
```typescript
const API_BASE_URL = 'YOUR_BACKEND_URL'; // e.g., 'https://your-api.com'
```

## 🌍 Supported Languages

- 🇬🇧 English (en)
- 🇮🇳 Hindi (hi)
- 🇮🇳 Marathi (mr)

Switch languages using the language button in the header.

## 📸 Screenshots

The app features:
- Clean, modern UI with green agriculture theme
- Smooth animations and transitions
- Responsive design for all screen sizes
- Intuitive navigation
- Accessible design

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **AI**: Google Generative AI (Gemini)
- **State Management**: React Hooks
- **UI**: Custom components with StyleSheet
- **Navigation**: Tab-based navigation
- **Image Handling**: Expo Image Picker

## 📦 Dependencies

```json
{
  "@google/generative-ai": "^0.24.1",
  "@react-native-picker/picker": "2.11.1",
  "expo": "~52.0.0",
  "expo-image-picker": "~16.0.0",
  "react": "18.3.1",
  "react-native": "0.76.5"
}
```

## 🐛 Troubleshooting

### Chatbot not working?
- Check if you've set the correct Gemini API key
- Verify your internet connection
- Check console for error messages

### App crashes on startup?
- Run `npm install` again
- Clear cache: `expo start -c`
- Check if all dependencies are installed

### Image picker not working?
- Grant camera and gallery permissions
- Check `app.json` for correct permissions

## 🤝 Contributing

This is a farming assistance app designed to help farmers. Contributions are welcome!

## 📄 License

This project is open source and available for educational purposes.

## 📞 Support

For issues or questions, please check:
- Expo documentation: https://docs.expo.dev
- React Native docs: https://reactnative.dev
- Google AI docs: https://ai.google.dev

---

**Made with ❤️ for farmers**
