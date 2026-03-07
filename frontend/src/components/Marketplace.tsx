import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MOCK_PRODUCTS, TEXTS } from '../constants';
import { useNotifications } from '../hooks/useNotifications';
import { colors, globalStyles } from '../styles';
import { Language, MarketplaceCategory, Product } from '../types';
import ProductCard from './ProductCard';
import SellForm from './SellForm';

interface MarketplaceProps {
  language: Language;
}

import { getProducts, addProduct } from '../services/apiService';

const Marketplace: React.FC<MarketplaceProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<MarketplaceCategory | 'all'>('all');
  const { addNotification } = useNotifications();
  const T = TEXTS[language];

  const fetchProducts = async () => {
    setLoading(true);
    const response = await getProducts(categoryFilter === 'all' ? undefined : categoryFilter, searchTerm);
    if (response.success && response.data && response.data.length > 0) {
      setProducts(response.data);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchProducts();
  }, [categoryFilter, searchTerm]);

  const handleAddProduct = async (product: Omit<Product, 'id'>) => {
    const response = await addProduct(product);
    if (response.success) {
      addNotification(T.productUploaded, 'success');
      fetchProducts();
      setActiveTab('buy');
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
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
            style={[styles.tab, activeTab === 'buy' && styles.tabActive]}
            onPress={() => setActiveTab('buy')}
          >
            <Text style={[styles.tabText, activeTab === 'buy' && styles.tabTextActive]}>
              {T.buy}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'sell' && styles.tabActive]}
            onPress={() => setActiveTab('sell')}
          >
            <Text style={[styles.tabText, activeTab === 'sell' && styles.tabTextActive]}>
              {T.sell}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'buy' && (
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
              style={[styles.filterChip, categoryFilter === 'all' && styles.filterChipActive]}
              onPress={() => setCategoryFilter('all')}
            >
              <Text style={[styles.filterText, categoryFilter === 'all' && styles.filterTextActive]}>
                {T.allCategories}
              </Text>
            </TouchableOpacity>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.filterChip, categoryFilter === cat && styles.filterChipActive]}
                onPress={() => setCategoryFilter(cat)}
              >
                <Text style={[styles.filterText, categoryFilter === cat && styles.filterTextActive]}>
                  {T[cat]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} language={language} />
          ))}
        </View>
      )}

      {activeTab === 'sell' && <SellForm onAddProduct={handleAddProduct} language={language} />}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.gray200,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray600,
  },
  tabTextActive: {
    color: colors.white,
  },
  searchInput: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.gray200,
    fontSize: 14,
  },
  filterScrollView: {
    marginBottom: 20,
  },
  filterRow: {
    paddingRight: 10,
  },
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
  filterText: {
    fontSize: 14,
    color: colors.gray600,
  },
  filterTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
});

export default Marketplace;