import { Picker } from "@react-native-picker/picker";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { INDIAN_STATES, TEXTS } from "../constants";
import { colors, globalStyles } from "../styles";
import { Language } from "../types";

// --- FIREBASE IMPORTS ---
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface RegisterProps {
  onRegister: () => void;
  onNavigateToLogin: () => void;
  language: Language;
}

const Register: React.FC<RegisterProps> = ({
  onRegister,
  onNavigateToLogin,
  language,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const T = TEXTS[language];

  // Password Strength Logic
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
    if (passwordStrength <= 1) return colors.danger;
    if (passwordStrength <= 3) return colors.warning;
    return colors.primary;
  };

  const handleSubmit = async () => {
    // 1. Basic Validation
    if (
      !username ||
      !email ||
      !state ||
      !city ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    if (passwordStrength < 2) {
      Alert.alert("Error", "Password is too weak.");
      return;
    }

    setLoading(true);

    try {
      // 2. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      const user = userCredential.user;

      // 3. Save Profile Data in Firestore
      // IMPORTANT: Ensure you have "Created Database" in Firestore Console!
      await setDoc(doc(db, "users", user.uid), {
        username: username.trim(),
        email: email.toLowerCase().trim(),
        state,
        city: city.trim(),
        role: "farmer",
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Success", "Registration successful! Please login.", [
        { text: "OK", onPress: onRegister },
      ]);
    } catch (error: any) {
      console.error("Registration Error Code:", error.code);

      let msg = "An unexpected error occurred.";

      // Professional Error Handling
      switch (error.code) {
        case "auth/email-already-in-use":
          msg = "This email is already registered.";
          break;
        case "auth/invalid-email":
          msg = "Please enter a valid email address.";
          break;
        case "auth/weak-password":
          msg = "Password should be at least 6 characters.";
          break;
        case "auth/network-request-failed":
          msg = "Network error. Please check your internet.";
          break;
        case "auth/operation-not-allowed":
          msg = "Email/Password sign-in is not enabled in Firebase Console.";
          break;
      }

      Alert.alert("Registration Failed", msg);
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

        <View
          style={[
            globalStyles.input,
            { paddingVertical: 0, justifyContent: "center" },
          ]}
        >
          <Picker
            selectedValue={state}
            onValueChange={(itemValue) => setState(itemValue)}
            enabled={!loading}
          >
            <Picker.Item label="Select State" value="" color={colors.gray400} />
            {INDIAN_STATES.map((s) => (
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
          <View
            style={{
              backgroundColor: colors.gray200,
              height: 6,
              borderRadius: 3,
              marginBottom: 15,
            }}
          >
            <View
              style={{
                height: 6,
                borderRadius: 3,
                backgroundColor: getStrengthColor(),
                width: `${Math.min(passwordStrength * 20, 100)}%`,
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
            {T.haveAccount}{" "}
            <Text style={globalStyles.linkTextBold}>{T.signIn}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Register;
