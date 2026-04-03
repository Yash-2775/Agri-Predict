// src/components/CropDiseaseDetection.tsx
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { analyzeCropDisease, DiseaseAnalysis } from "../services/geminiService";
import { Language } from "../types";

interface CropDiseaseDetectionProps {
  language: Language;
  // Add this prop so the button can open the Chatbot tab
  onAskChatbot?: (initialMessage: string) => void;
}

const getSupportedLanguages = () => [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
];

const CropDiseaseDetection: React.FC<CropDiseaseDetectionProps> = ({
  language,
  onAskChatbot,
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseAnalysis | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = getSupportedLanguages();

  const requestPermissions = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!cameraPermission.granted || !mediaPermission.granted) {
      Alert.alert(
        "Permissions Required",
        "Camera and photo library permissions are needed.",
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!res.canceled && res.assets[0]) {
      setImageUri(res.assets[0].uri);
      setResult(null);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;
    const res = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!res.canceled && res.assets[0]) {
      setImageUri(res.assets[0].uri);
      setResult(null);
    }
  };

  const analyzePlant = async () => {
    if (!imageUri) {
      Alert.alert("No Image", "Please select or capture an image first.");
      return;
    }
    setAnalyzing(true);
    setResult(null);
    try {
      const analysis = await analyzeCropDisease(imageUri, selectedLanguage);
      setResult(analysis);
    } catch (error: any) {
      Alert.alert("Error", error.message || "An unexpected error occurred");
    } finally {
      setAnalyzing(false);
    }
  };

  const getConfidencePercentage = (confidence: any): number => {
    if (typeof confidence === "number") {
      return confidence <= 1 ? confidence * 100 : confidence;
    }
    return 0;
  };

  const openReferenceLink = (disease: string) => {
    const searchQuery = encodeURIComponent(
      `${disease} plant disease treatment`,
    );
    Linking.openURL(`https://www.google.com/search?q=${searchQuery}`);
  };

  // Build a smart pre-filled message for the chatbot
  const handleAskChatbot = () => {
    if (!onAskChatbot) return;
    const disease = result?.disease_name || "unknown disease";
    const plant = result?.plant_type || "my crop";
    const msg = `My ${plant} has ${disease}. What should I do to treat it effectively?`;
    onAskChatbot(msg);
  };

  const confidencePercentage = result?.confidence
    ? getConfidencePercentage(result.confidence)
    : 0;
  const isConfident = confidencePercentage >= 60;

  return (
    <ScrollView style={styles.container}>
      {/* Language Picker */}
      <View style={styles.section}>
        <Text style={styles.label}>Select Language:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={setSelectedLanguage}
            style={styles.picker}
          >
            {languages.map((lang: any) => (
              <Picker.Item
                key={lang.code}
                label={`${lang.nativeName} (${lang.name})`}
                value={lang.name}
              />
            ))}
          </Picker>
        </View>
      </View>

      {/* Image Upload / Camera */}
      <View style={styles.section}>
        <Text style={styles.label}>Upload or Capture Image:</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>📁 Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>📷 Take Photo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Image Preview */}
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      )}

      {/* Analyze Button */}
      {imageUri && (
        <TouchableOpacity
          style={[
            styles.analyzeButton,
            analyzing && styles.analyzeButtonDisabled,
          ]}
          onPress={analyzePlant}
          disabled={analyzing}
        >
          {analyzing ? (
            <View style={styles.analyzingContainer}>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={styles.analyzeButtonText}>
                {" "}
                Analyzing with AI...
              </Text>
            </View>
          ) : (
            <Text style={styles.analyzeButtonText}>🔍 Detect Disease</Text>
          )}
        </TouchableOpacity>
      )}

      {/* Error State */}
      {result && !result.success && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>❌ {result.error}</Text>
        </View>
      )}

      {/* Results */}
      {result && result.success && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Detection Result</Text>

          {/* Low confidence warning */}
          {!isConfident && (
            <View style={styles.warningBox}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <Text style={styles.warningText}>
                Low confidence. Please upload a clearer image.
              </Text>
            </View>
          )}

          {/* Plant Type */}
          {result.plant_type && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>🌱 Plant Type:</Text>
              <Text style={styles.resultValue}>{result.plant_type}</Text>
            </View>
          )}

          {/* Disease Name */}
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>🔬 Disease Detected:</Text>
            <Text style={[styles.resultValue, styles.diseaseName]}>
              {result.disease_name || "Unknown"}
            </Text>
          </View>

          {/* Severity */}
          {result.severity && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>⚡ Severity:</Text>
              <Text
                style={[
                  styles.resultValue,
                  result.severity === "Severe"
                    ? styles.severityHigh
                    : result.severity === "Moderate"
                      ? styles.severityMid
                      : styles.severityLow,
                ]}
              >
                {result.severity}
              </Text>
            </View>
          )}

          {/* Confidence */}
          {result.confidence && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>📊 Confidence:</Text>
              <View style={styles.confidenceContainer}>
                <Text
                  style={[
                    styles.confidenceValue,
                    isConfident ? styles.confidenceHigh : styles.confidenceLow,
                  ]}
                >
                  {confidencePercentage.toFixed(1)}%
                </Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${confidencePercentage}%` as any },
                      isConfident ? styles.progressHigh : styles.progressLow,
                    ]}
                  />
                </View>
              </View>
            </View>
          )}

          {/* Symptoms */}
          {result.symptoms && result.symptoms.length > 0 && (
            <View style={styles.listSection}>
              <Text style={styles.sectionTitle}>🔎 Symptoms</Text>
              {result.symptoms.map((s, i) => (
                <View key={i} style={styles.listItemContainer}>
                  <Text style={styles.listNumber}>{i + 1}</Text>
                  <Text style={styles.listItem}>{s}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Quick Solution */}
          {result.solution && (
            <View style={styles.solutionSection}>
              <Text style={styles.sectionTitle}>💊 Quick Solution</Text>
              <View style={styles.solutionBox}>
                <Text style={styles.solutionText}>{result.solution}</Text>
              </View>
            </View>
          )}

          {/* Treatments */}
          {result.treatments && result.treatments.length > 0 && (
            <View style={styles.listSection}>
              <Text style={styles.sectionTitle}>💉 Treatments</Text>
              {result.treatments.map((t, i) => (
                <View key={i} style={styles.listItemContainer}>
                  <Text style={styles.listNumber}>{i + 1}</Text>
                  <Text style={styles.listItem}>{t}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Organic Solutions */}
          {result.organic_solutions && result.organic_solutions.length > 0 && (
            <View style={styles.listSection}>
              <Text style={styles.sectionTitle}>🌿 Organic Solutions</Text>
              {result.organic_solutions.map((o, i) => (
                <View key={i} style={styles.listItemContainer}>
                  <Text style={styles.listNumber}>{i + 1}</Text>
                  <Text style={styles.listItem}>{o}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Preventions */}
          {result.preventions && result.preventions.length > 0 && (
            <View style={styles.listSection}>
              <Text style={styles.sectionTitle}>🛡️ Preventions</Text>
              {result.preventions.map((p, i) => (
                <View key={i} style={styles.listItemContainer}>
                  <Text style={styles.listNumber}>{i + 1}</Text>
                  <Text style={styles.listItem}>{p}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Estimated Recovery */}
          {result.estimated_recovery && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>⏱️ Estimated Recovery:</Text>
              <Text style={styles.resultValue}>
                {result.estimated_recovery}
              </Text>
            </View>
          )}

          {/* Additional Notes */}
          {result.additional_notes && (
            <View style={styles.solutionSection}>
              <Text style={styles.sectionTitle}>📝 Notes for Farmers</Text>
              <View
                style={[styles.solutionBox, { backgroundColor: "#FFF8E1" }]}
              >
                <Text style={styles.solutionText}>
                  {result.additional_notes}
                </Text>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtonsRow}>
            {/* Ask Chatbot Button */}
            {onAskChatbot && (
              <TouchableOpacity
                style={styles.chatbotButton}
                onPress={handleAskChatbot}
              >
                <Text style={styles.chatbotButtonText}>🤖 Ask KisanBot</Text>
              </TouchableOpacity>
            )}

            {/* Learn More Button */}
            <TouchableOpacity
              style={styles.referenceButton}
              onPress={() =>
                openReferenceLink(result.disease_name || "plant disease")
              }
            >
              <Text style={styles.referenceButtonText}>🔗 Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  picker: {
    height: 75,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  imageContainer: {
    marginBottom: 16,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
  },
  analyzeButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    elevation: 3,
  },
  analyzeButtonDisabled: {
    backgroundColor: "#9E9E9E",
  },
  analyzingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  analyzeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorBox: {
    backgroundColor: "#FFEBEE",
    borderLeftWidth: 4,
    borderLeftColor: "#D32F2F",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 15,
  },
  resultContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  warningBox: {
    flexDirection: "row",
    backgroundColor: "#FFF3CD",
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  warningIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  warningText: {
    flex: 1,
    color: "#856404",
    fontSize: 14,
  },
  resultItem: {
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 6,
  },
  resultValue: {
    fontSize: 16,
    color: "#333",
  },
  diseaseName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D32F2F",
  },
  severityHigh: { color: "#D32F2F", fontWeight: "bold", fontSize: 16 },
  severityMid: { color: "#FF9800", fontWeight: "bold", fontSize: 16 },
  severityLow: { color: "#4CAF50", fontWeight: "bold", fontSize: 16 },
  confidenceContainer: {
    marginTop: 4,
  },
  confidenceValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  confidenceHigh: { color: "#4CAF50" },
  confidenceLow: { color: "#FF9800" },
  progressBar: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressHigh: { backgroundColor: "#4CAF50" },
  progressLow: { backgroundColor: "#FF9800" },
  solutionSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  solutionBox: {
    backgroundColor: "#E3F2FD",
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
    padding: 14,
    borderRadius: 8,
  },
  solutionText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
  listSection: {
    marginBottom: 16,
  },
  listItemContainer: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
  },
  listNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2196F3",
    marginRight: 10,
    minWidth: 24,
  },
  listItem: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
  actionButtonsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  chatbotButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    elevation: 2,
  },
  chatbotButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  referenceButton: {
    flex: 1,
    backgroundColor: "#9C27B0",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    elevation: 2,
  },
  referenceButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CropDiseaseDetection;
