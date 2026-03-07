// src/components/CropDiseaseDetection.tsx
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
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
} from 'react-native';
import { Language } from '../types';

// Define props interface
interface CropDiseaseDetectionProps {
  language: Language;
}

// Mock disease analysis result type
interface DiseaseAnalysis {
  success: boolean;
  plant_type?: string;
  disease_name?: string;
  confidence?: number;
  severity?: string;
  symptoms?: string[];
  treatments?: string[];
  preventions?: string[];
  organic_solutions?: string[];
  estimated_recovery?: string;
  solution?: string;
  additional_notes?: string;
}

// Mock supported languages
const getSupportedLanguages = () => [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
];

// Mock disease data
const getMockAnalysis = (): DiseaseAnalysis => {
  const mockDiseases = [
    {
      plant_type: 'Tomato',
      disease_name: 'Early Blight',
      confidence: 0.85,
      severity: 'Moderate',
      symptoms: [
        'Dark brown spots with concentric rings on lower leaves',
        'Yellowing of leaves around spots',
        'Premature leaf drop',
      ],
      treatments: [
        'Remove and destroy infected leaves immediately',
        'Apply copper-based fungicide every 7-10 days',
        'Ensure proper spacing between plants',
      ],
      preventions: [
        'Rotate crops every 2-3 years',
        'Use disease-resistant varieties',
        'Mulch around plants',
      ],
      organic_solutions: [
        'Neem oil spray',
        'Baking soda solution',
        'Compost tea application',
      ],
      estimated_recovery: '2-3 weeks with proper treatment',
      solution: 'Apply copper-based fungicide and remove infected leaves',
      additional_notes: 'Early detection is key',
    },
    {
      plant_type: 'Wheat',
      disease_name: 'Leaf Rust',
      confidence: 0.78,
      severity: 'Severe',
      symptoms: [
        'Orange-red pustules on leaf surface',
        'Leaves turn yellow and dry prematurely',
      ],
      treatments: [
        'Apply systemic fungicides',
        'Remove infected plants',
      ],
      preventions: [
        'Plant resistant varieties',
        'Early sowing',
      ],
      organic_solutions: [
        'Sulfur-based sprays',
      ],
      estimated_recovery: '3-4 weeks',
      solution: 'Immediate fungicide application required',
      additional_notes: 'Disease spreads rapidly in cool, moist conditions',
    },
  ];

  return {
    success: true,
    ...mockDiseases[Math.floor(Math.random() * mockDiseases.length)],
  };
};

const CropDiseaseDetection: React.FC<CropDiseaseDetectionProps> = ({ language }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseAnalysis | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = getSupportedLanguages();

  const requestPermissions = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!cameraPermission.granted || !mediaPermission.granted) {
      Alert.alert(
        'Permissions Required',
        'Camera and photo library permissions are needed.'
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
      setResult(null);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
      setResult(null);
    }
  };

  const analyzePlant = async () => {
    if (!imageUri) {
      Alert.alert('No Image', 'Please select or capture an image first.');
      return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockResult = getMockAnalysis();
      setResult(mockResult);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An unexpected error occurred');
    } finally {
      setAnalyzing(false);
    }
  };

  const getConfidencePercentage = (confidence: any): number => {
    if (typeof confidence === 'number') {
      return confidence * 100;
    }
    return 0;
  };

  const openReferenceLink = (disease: string) => {
    const searchQuery = encodeURIComponent(`${disease} plant disease treatment`);
    const url = `https://www.google.com/search?q=${searchQuery}`;
    Linking.openURL(url);
  };

  const confidencePercentage = result?.confidence ? getConfidencePercentage(result.confidence) : 0;
  const isConfident = confidencePercentage >= 60;

  return (
    <ScrollView style={styles.container}>
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

      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      )}

      {imageUri && (
        <TouchableOpacity
          style={[styles.analyzeButton, analyzing && styles.analyzeButtonDisabled]}
          onPress={analyzePlant}
          disabled={analyzing}
        >
          {analyzing ? (
            <View style={styles.analyzingContainer}>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={styles.analyzeButtonText}> Detecting...</Text>
            </View>
          ) : (
            <Text style={styles.analyzeButtonText}>🔍 Detect Disease</Text>
          )}
        </TouchableOpacity>
      )}

      {result && result.success && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Detection Result</Text>

          {!isConfident && (
            <View style={styles.warningBox}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <Text style={styles.warningText}>
                Low confidence. Please upload a clearer image.
              </Text>
            </View>
          )}

          {result.plant_type && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>🌱 Plant Type:</Text>
              <Text style={styles.resultValue}>{result.plant_type}</Text>
            </View>
          )}

          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>🔬 Disease Detected:</Text>
            <Text style={[styles.resultValue, styles.diseaseName]}>
              {result.disease_name || 'Unknown'}
            </Text>
          </View>

          {result.confidence && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>📊 Accuracy:</Text>
              <View style={styles.confidenceContainer}>
                <Text style={[
                  styles.confidenceValue,
                  isConfident ? styles.confidenceHigh : styles.confidenceLow
                ]}>
                  {confidencePercentage.toFixed(1)}%
                </Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill,
                      { width: `${confidencePercentage}%` },
                      isConfident ? styles.progressHigh : styles.progressLow
                    ]} 
                  />
                </View>
              </View>
            </View>
          )}

          {result.solution && (
            <View style={styles.solutionSection}>
              <Text style={styles.sectionTitle}>💊 Solution</Text>
              <View style={styles.solutionBox}>
                <Text style={styles.solutionText}>{result.solution}</Text>
              </View>
            </View>
          )}

          {result.treatments && result.treatments.length > 0 && (
            <View style={styles.listSection}>
              <Text style={styles.sectionTitle}>💉 Treatments</Text>
              {result.treatments.map((treatment: string, index: number) => (
                <View key={index} style={styles.listItemContainer}>
                  <Text style={styles.listNumber}>{index + 1}</Text>
                  <Text style={styles.listItem}>{treatment}</Text>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={styles.referenceButton}
            onPress={() => openReferenceLink(result.disease_name || 'plant disease')}
          >
            <Text style={styles.referenceButtonText}>🔗 Learn More</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  picker: {
    height: 50,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  imageContainer: {
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  analyzeButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
  },
  analyzeButtonDisabled: {
    backgroundColor: '#9E9E9E',
  },
  analyzingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF3CD',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
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
    color: '#856404',
    fontSize: 14,
  },
  resultItem: {
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  resultValue: {
    fontSize: 16,
    color: '#333',
  },
  diseaseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  confidenceContainer: {
    marginTop: 4,
  },
  confidenceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  confidenceHigh: {
    color: '#4CAF50',
  },
  confidenceLow: {
    color: '#FF9800',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressHigh: {
    backgroundColor: '#4CAF50',
  },
  progressLow: {
    backgroundColor: '#FF9800',
  },
  solutionSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  solutionBox: {
    backgroundColor: '#E3F2FD',
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
    padding: 14,
    borderRadius: 8,
  },
  solutionText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  listSection: {
    marginBottom: 16,
  },
  listItemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  listNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginRight: 10,
    minWidth: 24,
  },
  listItem: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  referenceButton: {
    backgroundColor: '#9C27B0',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    elevation: 2,
  },
  referenceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CropDiseaseDetection;