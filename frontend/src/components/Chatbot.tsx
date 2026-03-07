import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { TEXTS } from '../constants';
import { colors } from '../styles';
import { ChatMessage, DiseaseDetectionResult, Language } from '../types';

// Your Gemini API key
const GEMINI_API_KEY = 'AIzaSyDwkK5evmcKbjn0r94WyXZJQM0Hr75rfr8';

interface ChatbotProps {
  language: Language;
  initialContext: DiseaseDetectionResult | null;
}

const Chatbot: React.FC<ChatbotProps> = ({ language, initialContext }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const T = TEXTS[language];

  useEffect(() => {
    const welcomeMessages = {
      [Language.EN]: initialContext
        ? `🌾 I've detected ${initialContext.diseaseName} on your crop (${(initialContext.confidence * 100).toFixed(1)}% confidence). I can help you with treatment, prevention, and farming advice. What would you like to know?`
        : "🌾 Namaste! I'm your AI farming assistant with expertise in crop diseases, pest management, irrigation, fertilizers, government schemes, and general agriculture. Ask me anything!",
      [Language.HI]: initialContext
        ? `🌾 मैंने आपकी फसल पर ${initialContext.diseaseName} का पता लगाया है (${(initialContext.confidence * 100).toFixed(1)}% विश्वास)। मैं उपचार, रोकथाम और कृषि सलाह में आपकी मदद कर सकता हूं।`
        : '🌾 नमस्ते! मैं फसल रोगों, कीट प्रबंधन, सिंचाई, उर्वरकों, सरकारी योजनाओं और सामान्य कृषि में विशेषज्ञता वाला आपका AI कृषि सहायक हूं। मुझसे कुछ भी पूछें!',
      [Language.MR]: initialContext
        ? `🌾 मी तुमच्या पिकावर ${initialContext.diseaseName} शोधले आहे (${(initialContext.confidence * 100).toFixed(1)}% विश्वास). मी उपचार, प्रतिबंध आणि शेती सल्ल्यामध्ये मदत करू शकतो.`
        : '🌾 नमस्कार! मी पीक रोग, कीटक व्यवस्थापन, सिंचन, खते, सरकारी योजना आणि सामान्य शेतीमध्ये तज्ञ असलेला तुमचा AI शेती सहाय्यक आहे. मला काहीही विचारा!',
    };

    setMessages([
      {
        id: Date.now().toString(),
        sender: 'bot',
        text: welcomeMessages[language],
      },
    ]);
  }, [initialContext, language]);

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    const userQuestion = input;
    setInput('');
    setIsLoading(true);

    try {
      // 1. Try backend first (for history tracking and consistency)
      const { chatWithBot } = require('../services/apiService');
      const response = await chatWithBot(userQuestion, language, 'demo-user', initialContext);

      if (response.success && response.data?.response) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: response.data.response,
            sender: 'bot',
          },
        ]);
        setIsLoading(false);
        return;
      }

      // 2. Fallback to direct Gemini call if backend fails
      console.log('Backend chat failed or not connected, falling back to direct Gemini API call...');

      const systemPrompt = {
        [Language.EN]: `You are an expert AI assistant for Indian agriculture. Answer ALL questions (including general knowledge) accurately. Provide farming tips if relevant.`,
        [Language.HI]: `आप किसानों के लिए एक विशेषज्ञ एआई सहायक हैं। सभी प्रश्नों के उत्तर सही ढंग से दें।`,
        [Language.MR]: `तुम्ही शेतकऱ्यांसाठी तज्ञ एआय सहाय्यक आहात. सर्व प्रश्नांची अचूक उत्तरे द्या.`,
      };

      const prompt = `${systemPrompt[language] || systemPrompt[Language.EN]}\n\nQuestion: ${userQuestion}`;

      const directResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await directResponse.json();

      if (!directResponse.ok) {
        throw new Error(data?.error?.message || `AI Service Error ${directResponse.status}`);
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received from AI.';

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text,
          sender: 'bot',
        },
      ]);
    } catch (error: any) {
      console.error('Chatbot error:', error);

      let errorMsg = 'Oops! The AI Assistant is temporarily unavailable.';
      if (error.message.includes('API_KEY_INVALID') || error.message.includes('403') || error.message.includes('404')) {
        errorMsg = 'AI Assistant API key is not configured or has expired. Please add a valid Gemini API key in Chatbot.tsx to enable the AI assistant.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: errorMsg,
          sender: 'bot',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.botIcon}>
            <Text style={styles.botIconText}>🤖</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>{T.aiAssistant}</Text>
            <Text style={styles.headerSubtitle}>Powered by Gemini AI</Text>
          </View>
        </View>
        <View style={styles.languagePill}>
          <Text style={styles.languageText}>{language.toUpperCase()}</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg, index) => (
          <MessageBubble key={msg.id} message={msg} isLast={index === messages.length - 1} />
        ))}
        {isLoading && (
          <View style={[styles.messageWrapper, styles.botMessageWrapper]}>
            <View style={styles.botAvatar}>
              <Text style={styles.avatarText}>🌾</Text>
            </View>
            <View style={[styles.messageBubble, styles.botBubble]}>
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={[styles.typingDot, styles.typingDot2]} />
                <View style={[styles.typingDot, styles.typingDot3]} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder={T.chatPlaceholder}
          placeholderTextColor={colors.gray400}
          editable={!isLoading}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, (isLoading || !input.trim()) && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={isLoading || !input.trim()}
        >
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const MessageBubble: React.FC<{ message: ChatMessage; isLast: boolean }> = ({ message }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.messageWrapper,
        message.sender === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {message.sender === 'bot' && (
        <View style={styles.botAvatar}>
          <Text style={styles.avatarText}>🌾</Text>
        </View>
      )}
      <View style={[styles.messageBubble, message.sender === 'user' ? styles.userBubble : styles.botBubble]}>
        <Text style={[styles.messageText, message.sender === 'user' ? styles.userText : styles.botText]}>
          {message.text}
        </Text>
      </View>
      {message.sender === 'user' && (
        <View style={styles.userAvatar}>
          <Text style={styles.avatarText}>👨‍🌾</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gray200,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.primary,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  botIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  botIconText: { fontSize: 24 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: colors.white },
  headerSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  languagePill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  languageText: { color: colors.white, fontSize: 12, fontWeight: 'bold' },
  messagesContainer: { flex: 1, backgroundColor: '#f0f9ff' },
  messagesContent: { padding: 16 },
  messageWrapper: { flexDirection: 'row', marginBottom: 16, alignItems: 'flex-end' },
  userMessageWrapper: { justifyContent: 'flex-end' },
  botMessageWrapper: { justifyContent: 'flex-start' },
  botAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center', marginRight: 8,
  },
  userAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.secondary,
    justifyContent: 'center', alignItems: 'center', marginLeft: 8,
  },
  avatarText: { fontSize: 18 },
  messageBubble: { maxWidth: '75%', padding: 12, borderRadius: 16 },
  userBubble: { backgroundColor: colors.secondary, borderBottomRightRadius: 4 },
  botBubble: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  messageText: { fontSize: 15, lineHeight: 22 },
  userText: { color: colors.white },
  botText: { color: colors.gray900 },
  typingIndicator: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  typingDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: colors.gray400, marginHorizontal: 3,
  },
  typingDot2: { opacity: 0.7 },
  typingDot3: { opacity: 0.4 },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: colors.gray100,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 15,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    width: 48, height: 48,
    justifyContent: 'center', alignItems: 'center',
    elevation: 4,
  },
  sendButtonDisabled: { backgroundColor: colors.gray300, elevation: 0 },
  sendButtonText: { color: colors.white, fontWeight: 'bold', fontSize: 22 },
});

export default Chatbot;