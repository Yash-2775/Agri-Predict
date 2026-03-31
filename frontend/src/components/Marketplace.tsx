import React, { useMemo, useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { TEXTS } from "../constants";
import { useNotifications } from "../hooks/useNotifications";
import { colors, globalStyles } from "../styles";
import { Language, MarketplaceCategory, Product } from "../types";
import ProductCard from "./ProductCard";
import SellForm from "./SellForm";

// Firebase Imports
import { db } from "../firebaseConfig";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

interface MarketplaceProps {
  language: Language;
}

const Marketplace: React.FC<MarketplaceProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [products, setProducts] = useState<any[]>([]); // This will hold our real Firebase data
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<
    MarketplaceCategory | "all"
  >("all");

  const { addNotification } = useNotifications();
  const T = TEXTS[language];

  // --- REAL-TIME FIREBASE LISTENER ---
  useEffect(() => {
    setLoading(true);

    // 1. Setup the query to get products ordered by newest first
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));

    // 2. Start the "Live" connection
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const productsArray: any[] = [];
        snapshot.forEach((doc) => {
          // We grab the data and include the unique ID from Firebase
          productsArray.push({ id: doc.id, ...doc.data() });
        });

        setProducts(productsArray);
        setLoading(false);
      },
      (error) => {
        console.error("Firebase error: ", error);
        setLoading(false);
      },
    );

    // 3. Clean up the connection when the user leaves the screen
    return () => unsubscribe();
  }, []);

  // --- SEARCH & CATEGORY FILTERING ---
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productName = product.name || ""; // Safety check
      const matchesSearch = productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  const categories = Object.values(MarketplaceCategory);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.headerRow}>
        <Text style={globalStyles.screenTitle}>{T.marketplace}</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "buy" && styles.tabActive]}
            onPress={() => setActiveTab("buy")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "buy" && styles.tabTextActive,
              ]}
            >
              {T.buy}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "sell" && styles.tabActive]}
            onPress={() => setActiveTab("sell")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "sell" && styles.tabTextActive,
              ]}
            >
              {T.sell}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === "buy" && (
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder={T.searchProducts}
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor={colors.gray400}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScrollView}
            contentContainerStyle={styles.filterRow}
          >
            <TouchableOpacity
              style={[
                styles.filterChip,
                categoryFilter === "all" && styles.filterChipActive,
              ]}
              onPress={() => setCategoryFilter("all")}
            >
              <Text
                style={[
                  styles.filterText,
                  categoryFilter === "all" && styles.filterTextActive,
                ]}
              >
                {T.allCategories}
              </Text>
            </TouchableOpacity>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.filterChip,
                  categoryFilter === cat && styles.filterChipActive,
                ]}
                onPress={() => setCategoryFilter(cat)}
              >
                <Text
                  style={[
                    styles.filterText,
                    categoryFilter === cat && styles.filterTextActive,
                  ]}
                >
                  {T[cat]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {loading ? (
            <ActivityIndicator
              size="large"
              color={colors.primary}
              style={{ marginTop: 50 }}
            />
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                language={language}
              />
            ))
          ) : (
            <Text style={styles.noDataText}>No products found.</Text>
          )}
        </View>
      )}

      {activeTab === "sell" && (
        <SellForm
          language={language}
          onAddProduct={() => setActiveTab("buy")} // Switches back to buy tab after upload
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: colors.gray200,
    borderRadius: 8,
    padding: 4,
  },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  tabActive: { backgroundColor: colors.primary },
  tabText: { fontSize: 14, fontWeight: "600", color: colors.gray600 },
  tabTextActive: { color: colors.white },
  searchInput: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.gray200,
    fontSize: 14,
  },
  filterScrollView: { marginBottom: 20 },
  filterRow: { paddingRight: 10 },
  filterChip: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: { fontSize: 14, color: colors.gray600 },
  filterTextActive: { color: colors.white, fontWeight: "600" },
  noDataText: {
    textAlign: "center",
    marginTop: 50,
    color: colors.gray400,
    fontSize: 16,
  },
});

export default Marketplace;
