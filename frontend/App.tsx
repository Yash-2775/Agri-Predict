import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Components
import Chatbot from './src/components/Chatbot';
import CropDiseaseDetection from './src/components/CropDiseaseDetection';
import GovernmentSchemes from './src/components/GovernmentSchemes';
import Header from './src/components/Header';
import Login from './src/components/Login';
import Marketplace from './src/components/Marketplace';
import Notification from './src/components/Notification';
import Register from './src/components/Register';

// Hooks & Types
import { useNotifications } from './src/hooks/useNotifications';
import { colors } from './src/styles';
import { DiseaseDetectionResult, Language, User } from './src/types';
import { TEXTS } from './src/constants';

type Screen = 'dashboard' | 'marketplace' | 'cropDisease' | 'govtSchemes' | 'aiAssistant';
type AuthScreen = 'login' | 'register';

const FARMING_TIPS = [
  'Rotate crops every season to maintain soil health and reduce pest buildup.',
  'Test your soil pH before planting — most crops prefer 6.0 to 7.0.',
  'Early morning is the best time to irrigate to reduce evaporation loss.',
  'Use neem-based pesticides as an eco-friendly alternative to chemicals.',
  'Keep a farm diary to track crop cycles, yields, and expenses.',
  'Intercropping legumes with cereals can improve nitrogen in the soil.',
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [diseaseContext, setDiseaseContext] = useState<DiseaseDetectionResult | null>(null);
  const { notifications, addNotification } = useNotifications();

  const T = TEXTS[language];

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setActiveScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setAuthScreen('login');
  };

  const handleDiseaseDetected = (result: DiseaseDetectionResult) => {
    setDiseaseContext(result);
    setActiveScreen('aiAssistant');
  };

  // Auth screens
  if (!user) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        {authScreen === 'login' ? (
          <Login
            onLogin={handleLogin}
            onNavigateToRegister={() => setAuthScreen('register')}
            language={language}
          />
        ) : (
          <Register
            onRegister={() => setAuthScreen('login')}
            onNavigateToLogin={() => setAuthScreen('login')}
            language={language}
          />
        )}
      </SafeAreaProvider>
    );
  }

  const navItems: Array<{ key: Screen; label: string; icon: string }> = [
    { key: 'dashboard', label: T.dashboard, icon: '🏠' },
    { key: 'marketplace', label: T.marketplace, icon: '🛒' },
    { key: 'cropDisease', label: T.cropDisease, icon: '🔬' },
    { key: 'govtSchemes', label: T.govtSchemes, icon: '📋' },
    { key: 'aiAssistant', label: T.aiAssistant, icon: '🤖' },
  ];

  const renderScreen = () => {
    switch (activeScreen) {
      case 'marketplace':
        return <Marketplace language={language} />;
      case 'cropDisease':
        return <CropDiseaseDetection language={language} />;
      case 'govtSchemes':
        return <GovernmentSchemes language={language} />;
      case 'aiAssistant':
        return <Chatbot language={language} initialContext={diseaseContext} />;
      default:
        return <Dashboard user={user} language={language} T={T} onNavigate={setActiveScreen} />;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header
          user={user}
          onLogout={handleLogout}
          language={language}
          setLanguage={setLanguage}
        />

        <View style={styles.content}>{renderScreen()}</View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[styles.navItem, activeScreen === item.key && styles.navItemActive]}
              onPress={() => setActiveScreen(item.key)}
            >
              <Text style={styles.navIcon}>{item.icon}</Text>
              <Text
                style={[
                  styles.navLabel,
                  activeScreen === item.key && styles.navLabelActive,
                ]}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Notification notifications={notifications} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Dashboard Component
interface DashboardProps {
  user: User;
  language: Language;
  T: Record<string, string>;
  onNavigate: (screen: Screen) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, language, T, onNavigate }) => {
  const tipIndex = new Date().getDate() % FARMING_TIPS.length;
  const todaysTip = FARMING_TIPS[tipIndex];

  const quickActions: Array<{ icon: string; label: string; screen: Screen; color: string }> = [
    { icon: '🔬', label: T.detectDisease, screen: 'cropDisease', color: '#ef4444' },
    { icon: '📋', label: T.viewSchemes, screen: 'govtSchemes', color: '#3b82f6' },
    { icon: '🛒', label: T.sellProduct, screen: 'marketplace', color: '#f59e0b' },
    { icon: '🤖', label: T.chatWithAI, screen: 'aiAssistant', color: '#8b5cf6' },
  ];

  return (
    <ScrollView style={dashStyles.container} contentContainerStyle={dashStyles.content}>
      {/* Welcome Banner */}
      <View style={dashStyles.welcomeBanner}>
        <View>
          <Text style={dashStyles.welcomeGreeting}>{T.goodMorning} 👋</Text>
          <Text style={dashStyles.welcomeName}>{user.username}</Text>
          {user.region && <Text style={dashStyles.welcomeRegion}>📍 {user.region}</Text>}
        </View>
        <Text style={dashStyles.welcomeEmoji}>🌾</Text>
      </View>

      {/* Today's Farming Tip */}
      <View style={dashStyles.tipCard}>
        <View style={dashStyles.tipHeader}>
          <Text style={dashStyles.tipIcon}>💡</Text>
          <Text style={dashStyles.tipTitle}>{T.farmingTips}</Text>
        </View>
        <Text style={dashStyles.tipText}>{todaysTip}</Text>
      </View>

      {/* Quick Actions */}
      <Text style={dashStyles.sectionTitle}>{T.quickActions}</Text>
      <View style={dashStyles.actionsGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.screen}
            style={[dashStyles.actionCard, { borderTopColor: action.color }]}
            onPress={() => onNavigate(action.screen)}
            activeOpacity={0.8}
          >
            <Text style={dashStyles.actionIcon}>{action.icon}</Text>
            <Text style={dashStyles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* App Info */}
      <View style={dashStyles.infoCard}>
        <Text style={dashStyles.infoTitle}>🌱 About Agri-Predict</Text>
        <Text style={dashStyles.infoText}>
          Your smart farming companion — detect crop diseases, discover government schemes,
          buy/sell in the marketplace, and get AI-powered advice.
        </Text>
      </View>
    </ScrollView>
  );
};

const dashStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray50 },
  content: { padding: 16, paddingBottom: 24 },
  welcomeBanner: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  welcomeGreeting: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 4 },
  welcomeName: { fontSize: 24, fontWeight: 'bold', color: colors.white, marginBottom: 4 },
  welcomeRegion: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  welcomeEmoji: { fontSize: 60 },
  tipCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  tipHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  tipIcon: { fontSize: 18, marginRight: 8 },
  tipTitle: { fontSize: 15, fontWeight: 'bold', color: colors.gray800 },
  tipText: { fontSize: 14, color: colors.gray600, lineHeight: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray900,
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  actionCard: {
    width: '47%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    borderTopWidth: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: { fontSize: 36, marginBottom: 10 },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray700,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: colors.green100,
    borderRadius: 12,
    padding: 16,
  },
  infoTitle: { fontSize: 16, fontWeight: 'bold', color: colors.green700, marginBottom: 8 },
  infoText: { fontSize: 13, color: colors.gray700, lineHeight: 20 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray50 },
  content: { flex: 1 },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: colors.green100,
  },
  navIcon: { fontSize: 20, marginBottom: 2 },
  navLabel: {
    fontSize: 10,
    color: colors.gray500,
    fontWeight: '500',
  },
  navLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});

registerRootComponent(App);
