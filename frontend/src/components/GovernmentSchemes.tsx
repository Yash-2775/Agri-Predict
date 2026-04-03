import React, { useMemo, useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MOCK_SCHEMES, TEXTS } from "../constants";
import { colors } from "../styles";
import { Language } from "../types";

interface GovernmentSchemesProps {
  language: Language;
}

const GovernmentSchemes: React.FC<GovernmentSchemesProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const T = TEXTS[language];

  const filteredSchemes = useMemo(() => {
    if (!MOCK_SCHEMES || MOCK_SCHEMES.length === 0) return [];
    return MOCK_SCHEMES.filter(
      (scheme) =>
        scheme.title[language]
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        scheme.description[language]
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, language]);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(() => {
      console.warn("Could not open URL:", url);
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: colors.primary,
          marginBottom: 16,
        }}
      >
        {T.govtSchemes}
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder={T.searchSchemes}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor={colors.gray400}
      />

      {filteredSchemes.length === 0 && (
        <Text style={styles.noResults}>No schemes found.</Text>
      )}

      {filteredSchemes.map((scheme) => {
        const isExpanded = expandedId === scheme.id;
        return (
          <View key={scheme.id} style={styles.schemeCard}>
            {/* Title */}
            <Text style={styles.schemeTitle}>{scheme.title[language]}</Text>

            {/* Description */}
            <Text style={styles.schemeDescription}>
              {scheme.description[language]}
            </Text>

            {/* Eligibility */}
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>✅ {T.eligibility}:</Text>
              <Text style={styles.detailText}>
                {scheme.eligibility[language]}
              </Text>
            </View>

            {/* Benefits */}
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>💰 {T.benefits}:</Text>
              <Text style={styles.detailText}>{scheme.benefits[language]}</Text>
            </View>

            {/* Expandable Section */}
            <TouchableOpacity
              style={styles.expandButton}
              onPress={() => toggleExpand(scheme.id)}
            >
              <Text style={styles.expandButtonText}>
                {isExpanded ? "▲ Hide Details" : "▼ Show Documents & Steps"}
              </Text>
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.expandedContent}>
                {/* Documents */}
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>📄 {T.documents}:</Text>
                  <Text style={styles.detailText}>
                    {scheme.documents[language]}
                  </Text>
                </View>

                {/* How to Apply */}
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>📝 {T.howToApply}:</Text>
                  <Text style={styles.detailText}>
                    {scheme.howToApply[language]}
                  </Text>
                </View>
              </View>
            )}

            {/* Official Link Button */}
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => handleLinkPress(scheme.link)}
            >
              <Text style={styles.linkButtonText}>🌐 {T.officialLink} →</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: 16, paddingBottom: 40 },
  searchInput: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.gray200,
    fontSize: 14,
  },
  noResults: {
    textAlign: "center",
    color: colors.gray400,
    marginTop: 40,
    fontSize: 16,
  },
  schemeCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  schemeTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
  },
  schemeDescription: {
    fontSize: 14,
    color: colors.gray700,
    marginBottom: 12,
    lineHeight: 20,
  },
  detailSection: { marginBottom: 10 },
  detailLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.gray800,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 13,
    color: colors.gray600,
    lineHeight: 20,
  },
  expandButton: {
    backgroundColor: "#f0f9ff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#bae6fd",
  },
  expandButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0284c7",
  },
  expandedContent: {
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  linkButton: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  linkButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#15803d",
  },
});

export default GovernmentSchemes;
