import React, { useEffect, useRef, useState } from "react";
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
} from "react-native";
import { TEXTS } from "../constants";
import { colors } from "../styles";
import { ChatMessage, DiseaseDetectionResult, Language } from "../types";
import { getFarmingAdvice } from "../services/geminiService"; // New Service

interface ChatbotProps {
  language: Language;
  initialContext: DiseaseDetectionResult | null;
}

const Chatbot: React.FC<ChatbotProps> = ({ language, initialContext }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const T = TEXTS[language];

  // Welcome message logic
  useEffect(() => {
    const welcomeMessages = {
      [Language.EN]: initialContext
        ? `🌾 I've detected ${initialContext.diseaseName} (${(initialContext.confidence * 100).toFixed(1)}% confidence). How can I help with treatment?`
        : "🌾 Namaste! I'm your AI farming assistant. Ask me about crops, pests, or fertilizers!",
      [Language.HI]: initialContext
        ? `🌾 मैंने ${initialContext.diseaseName} का पता लगाया है। मैं उपचार में आपकी मदद कर सकता हूँ।`
        : "🌾 नमस्ते! मैं आपका AI कृषि सहायक हूँ। मुझसे कुछ भी पूछें!",
      [Language.MR]: initialContext
        ? `🌾 मी ${initialContext.diseaseName} शोधले आहे. मी तुम्हाला उपचारासाठी मदत करू शकतो.`
        : "🌾 नमस्कार! मी तुमचा AI शेती सहाय्यक आहे. मला काहीही विचारा!",
    };

    setMessages([
      {
        id: Date.now().toString(),
        sender: "bot",
        text: welcomeMessages[language],
      },
    ]);
  }, [initialContext, language]);

  // Auto-scroll logic
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    const userQuestion = input;
    setInput("");
    setIsLoading(true);

    try {
      // Call the Gemini service directly
      const botResponse = await getFarmingAdvice(userQuestion, language);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: "bot",
        },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "I'm having trouble connecting. Please try again.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      {/* Header */}
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
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((msg, index) => (
          <MessageBubble key={msg.id} message={msg} />
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

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder={T.chatPlaceholder}
          placeholderTextColor={colors.gray400}
          editable={!isLoading}
          multiline
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (isLoading || !input.trim()) && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={isLoading || !input.trim()}
        >
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  return (
    <View
      style={[
        styles.messageWrapper,
        message.sender === "user"
          ? styles.userMessageWrapper
          : styles.botMessageWrapper,
      ]}
    >
      {message.sender === "bot" && (
        <View style={styles.botAvatar}>
          <Text style={styles.avatarText}>🌾</Text>
        </View>
      )}
      <View
        style={[
          styles.messageBubble,
          message.sender === "user" ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            message.sender === "user" ? styles.userText : styles.botText,
          ]}
        >
          {message.text}
        </Text>
      </View>
      {message.sender === "user" && (
        <View style={styles.userAvatar}>
          <Text style={styles.avatarText}>👨‍🌾</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: colors.primary,
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  botIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  botIconText: { fontSize: 24 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: colors.white },
  headerSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  messagesContainer: { flex: 1, backgroundColor: "#f0f9ff" },
  messagesContent: { padding: 16 },
  messageWrapper: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-end",
  },
  userMessageWrapper: { justifyContent: "flex-end" },
  botMessageWrapper: { justifyContent: "flex-start" },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  avatarText: { fontSize: 16 },
  messageBubble: { maxWidth: "80%", padding: 12, borderRadius: 16 },
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
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.gray400,
    marginHorizontal: 2,
  },
  typingDot2: { opacity: 0.6 },
  typingDot3: { opacity: 0.3 },
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: colors.gray100,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    fontSize: 15,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: { backgroundColor: colors.gray300 },
  sendButtonText: { color: colors.white, fontSize: 20 },
});

export default Chatbot;
