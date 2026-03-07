import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TEXTS } from '../constants';
import { login } from '../services/apiService';
import { globalStyles } from '../styles';
import { Language, User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigateToRegister: () => void;
  language: Language;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigateToRegister, language }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const T = TEXTS[language];

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await login({ email, password });

      if (response.success && response.data) {
        // Convert API user data to app User type
        const user: User = {
          username: response.data.user.username,
          email: response.data.user.email,
          region: response.data.user.region,
        };
        onLogin(user);
      } else {
        Alert.alert('Login Failed', response.error || 'Invalid credentials');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      style={globalStyles.authContainer} 
      contentContainerStyle={{ justifyContent: 'center', flexGrow: 1, padding: 16 }}
    >
      <View style={globalStyles.authCard}>
        <View style={globalStyles.authIcon}>
          <Text style={globalStyles.authIconText}>🌾</Text>
        </View>
        <Text style={globalStyles.authTitle}>{T.loginTitle}</Text>

        <TextInput
          style={globalStyles.input}
          placeholder={T.email}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          editable={!loading}
        />

        <TextInput
          style={globalStyles.input}
          placeholder={T.password}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
          editable={!loading}
        />

        <TouchableOpacity 
          style={[globalStyles.button, loading && { opacity: 0.6 }]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={globalStyles.buttonText}>{T.login}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onNavigateToRegister} disabled={loading}>
          <Text style={globalStyles.linkText}>
            {T.noAccount}{' '}
            <Text style={globalStyles.linkTextBold}>{T.signUp}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;