import { Picker } from '@react-native-picker/picker';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { INDIAN_STATES, TEXTS } from '../constants';
import { register } from '../services/apiService';
import { colors, globalStyles } from '../styles';
import { Language } from '../types';

interface RegisterProps {
  onRegister: () => void;
  onNavigateToLogin: () => void;
  language: Language;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onNavigateToLogin, language }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const T = TEXTS[language];

  const passwordStrength = useMemo(() => {
    let strength = 0;
    if (password.length > 5) strength++;
    if (password.length > 7) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  }, [password]);

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return colors.danger;
      case 2:
      case 3:
        return colors.warning;
      case 4:
      case 5:
        return colors.primary;
      default:
        return colors.gray200;
    }
  };

  const handleSubmit = async () => {
    if (!username || !email || !state || !city || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
    if (passwordStrength < 3) {
      Alert.alert('Error', 'Password is not strong enough.');
      return;
    }

    setLoading(true);

    try {
      const response = await register({
        username,
        email,
        password,
        state,
        city,
      });

      if (response.success) {
        Alert.alert('Success', 'Registration successful! Please login.', [
          { text: 'OK', onPress: onRegister },
        ]);
      } else {
        Alert.alert('Registration Failed', response.error || 'Please try again');
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
      contentContainerStyle={{ padding: 16, paddingVertical: 40 }}
    >
      <View style={globalStyles.authCard}>
        <View style={globalStyles.authIcon}>
          <Text style={globalStyles.authIconText}>🌾</Text>
        </View>
        <Text style={globalStyles.authTitle}>{T.registerTitle}</Text>

        <TextInput
          style={globalStyles.input}
          placeholder={T.username}
          value={username}
          onChangeText={setUsername}
          editable={!loading}
        />

        <TextInput
          style={globalStyles.input}
          placeholder={T.email}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        <View style={[globalStyles.input, { paddingVertical: 0 }]}>
          <Picker
            selectedValue={state}
            onValueChange={(itemValue) => setState(itemValue)}
            enabled={!loading}
          >
            <Picker.Item label="Select State" value="" />
            {INDIAN_STATES.map(s => (
              <Picker.Item key={s} label={s} value={s} />
            ))}
          </Picker>
        </View>

        <TextInput
          style={globalStyles.input}
          placeholder={T.city}
          value={city}
          onChangeText={setCity}
          editable={!loading}
        />

        <TextInput
          style={globalStyles.input}
          placeholder={T.password}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />

        {password.length > 0 && (
          <View style={{ backgroundColor: colors.gray200, height: 8, borderRadius: 4, marginBottom: 15 }}>
            <View
              style={{
                height: 8,
                borderRadius: 4,
                backgroundColor: getStrengthColor(),
                width: `${passwordStrength * 20}%`,
              }}
            />
          </View>
        )}

        <TextInput
          style={globalStyles.input}
          placeholder={T.confirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
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
            <Text style={globalStyles.buttonText}>{T.register}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onNavigateToLogin} disabled={loading}>
          <Text style={globalStyles.linkText}>
            {T.haveAccount}{' '}
            <Text style={globalStyles.linkTextBold}>{T.signIn}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Register;