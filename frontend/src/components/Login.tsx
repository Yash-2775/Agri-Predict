import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { TEXTS } from "../constants";
import { globalStyles, colors } from "../styles";
import { Language, User } from "../types";

// --- FIREBASE IMPORTS ---
import { auth, db } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigateToRegister: () => void;
  language: Language;
}

const Login: React.FC<LoginProps> = ({
  onLogin,
  onNavigateToRegister,
  language,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle state
  const [loading, setLoading] = useState(false);
  const T = TEXTS[language];

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // 1. Firebase Sign In (Using .trim() to prevent space errors)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      const firebaseUser = userCredential.user;

      // 2. Fetch Profile from Firestore
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

      if (userDoc.exists()) {
        const data = userDoc.data();
        onLogin({
          username: data.username,
          email: firebaseUser.email || "",
          region: `${data.city}, ${data.state}`,
        });
      } else {
        onLogin({
          username: "Farmer",
          email: firebaseUser.email || "",
          region: "Maharashtra",
        });
      }
    } catch (error: any) {
      console.error("Login Error:", error.code);
      let msg = "Invalid email or password.";

      if (
        error.code === "auth/invalid-api-key" ||
        error.code === "auth/api-key-not-valid"
      ) {
        msg =
          "Firebase Configuration Error. Please restart the app with 'npx expo start -c'.";
      } else if (error.code === "auth/user-not-found") {
        msg = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        msg = "Incorrect password.";
      }

      Alert.alert("Login Failed", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={globalStyles.authContainer}
      contentContainerStyle={{
        justifyContent: "center",
        flexGrow: 1,
        padding: 16,
      }}
    >
      <View style={globalStyles.authCard}>
        <View style={globalStyles.authIcon}>
          <Text style={globalStyles.authIconText}>🌾</Text>
        </View>
        <Text style={globalStyles.authTitle}>{T.loginTitle}</Text>

        {/* Email Input */}
        <TextInput
          style={globalStyles.input}
          placeholder={T.email}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        {/* Password Input with Toggle */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              globalStyles.input,
              { flex: 1, marginBottom: 0, borderWidth: 0 },
            ]}
            placeholder={T.password}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword} // Controlled by state
            editable={!loading}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <Text style={styles.eyeText}>{showPassword ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
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

        {/* Navigate to Register */}
        <TouchableOpacity onPress={onNavigateToRegister} disabled={loading}>
          <Text style={globalStyles.linkText}>
            {T.noAccount}{" "}
            <Text style={globalStyles.linkTextBold}>{T.signUp}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 15,
    paddingRight: 10,
  },
  eyeButton: {
    padding: 5,
  },
  eyeText: {
    fontSize: 18,
  },
});

export default Login;
