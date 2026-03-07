import React, { useState } from 'react';
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TEXTS } from '../constants';
import { colors } from '../styles';
import { Language, Product } from '../types';

interface ProductCardProps {
  product: Product;
  language: Language;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, language }) => {
  const T = TEXTS[language];
  const [showContact, setShowContact] = useState(false);

  const handleContactPress = () => {
    if (product.sellerPhone) {
      setShowContact(true);
    } else {
      Alert.alert('Contact Unavailable', 'Seller has not provided contact information.');
    }
  };

  const handleCall = () => {
    if (product.sellerPhone) {
      Linking.openURL(`tel:${product.sellerPhone}`);
    }
  };

  const handleWhatsApp = () => {
    if (product.sellerPhone) {
      const msg = encodeURIComponent(`Hi, I am interested in your listing: ${product.name}`);
      Linking.openURL(`https://wa.me/${product.sellerPhone}?text=${msg}`);
    }
  };

  const formatPrice = () => {
    if (product.sellOrRent === 'rent') {
      return `₹${product.price} ${T.perHour}`;
    }
    if (product.unit === 'kg') {
      return `₹${product.price} ${T.perKg}`;
    }
    if (product.unit === 'litre') {
      return `₹${product.price} ${T.perLitre}`;
    }
    return `₹${product.price}`;
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{T[product.category]}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>

        {product.sellerName && (
          <Text style={styles.sellerName}>🧑‍🌾 {product.sellerName}</Text>
        )}

        {product.quantity && (
          <Text style={styles.detail}>
            📦 {T.quantity}: {product.quantity} {product.unit}
          </Text>
        )}

        {product.expiryDate && (
          <Text style={styles.detail}>
            📅 {T.expiryDate}: {product.expiryDate}
          </Text>
        )}

        {product.description && (
          <Text style={styles.description}>{product.description}</Text>
        )}

        <Text style={styles.price}>{formatPrice()}</Text>

        {/* Contact Section */}
        {!showContact ? (
          <TouchableOpacity style={styles.contactButton} onPress={handleContactPress}>
            <Text style={styles.contactButtonText}>📞 {T.contactSeller}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.contactBox}>
            <Text style={styles.contactTitle}>📞 Seller Contact</Text>
            {product.sellerName && (
              <Text style={styles.contactDetail}>👤 {product.sellerName}</Text>
            )}
            <Text style={styles.contactDetail}>📱 {product.sellerPhone}</Text>
            <View style={styles.contactActions}>
              <TouchableOpacity style={styles.callButton} onPress={handleCall}>
                <Text style={styles.callButtonText}>📞 Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
                <Text style={styles.whatsappButtonText}>💬 WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.green100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.green700,
    textTransform: 'uppercase',
  },
  info: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray900,
    marginBottom: 4,
  },
  sellerName: {
    fontSize: 13,
    color: colors.gray600,
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    color: colors.gray600,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: colors.gray500,
    marginTop: 4,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 10,
    marginBottom: 4,
  },
  contactButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  contactButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  contactBox: {
    backgroundColor: colors.green100,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.green700,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.green700,
    marginBottom: 6,
  },
  contactDetail: {
    fontSize: 14,
    color: colors.gray800,
    marginBottom: 4,
  },
  contactActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  callButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  callButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 13,
  },
  whatsappButton: {
    flex: 1,
    backgroundColor: '#25D366',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  whatsappButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default ProductCard;