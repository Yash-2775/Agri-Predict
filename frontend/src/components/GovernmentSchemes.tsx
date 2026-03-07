import React, { useMemo, useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MOCK_SCHEMES, TEXTS } from '../constants';
import { colors, globalStyles } from '../styles';
import { Language } from '../types';

interface GovernmentSchemesProps {
  language: Language;
}

const GovernmentSchemes: React.FC<GovernmentSchemesProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const T = TEXTS[language];

  const filteredSchemes = useMemo(() => {
    return MOCK_SCHEMES.filter(
      (scheme) =>
        scheme.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description[language].toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, language]);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={globalStyles.screenTitle}>{T.govtSchemes}</Text>

      <TextInput
        style={styles.searchInput}
        placeholder={T.searchSchemes}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor={colors.gray400}
      />

      {filteredSchemes.map((scheme) => (
        <View key={scheme.id} style={styles.schemeCard}>
          <Text style={styles.schemeTitle}>{scheme.title[language]}</Text>
          <Text style={styles.schemeDescription}>{scheme.description[language]}</Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>{T.eligibility}:</Text>
              <Text style={styles.detailText}>{scheme.eligibility[language]}</Text>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>{T.benefits}:</Text>
              <Text style={styles.detailText}>{scheme.benefits[language]}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => handleLinkPress(scheme.link)}
          >
            <Text style={styles.linkButtonText}>{T.officialLink} →</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  searchInput: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.gray200,
    fontSize: 14,
  },
  schemeCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  schemeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  schemeDescription: {
    fontSize: 14,
    color: colors.gray700,
    marginBottom: 15,
    lineHeight: 20,
  },
  detailsContainer: {
    marginBottom: 15,
  },
  detailSection: {
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray800,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 13,
    color: colors.gray600,
    lineHeight: 18,
  },
  linkButton: {
    backgroundColor: colors.green100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  linkButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.green700,
  },
});

export default GovernmentSchemes;