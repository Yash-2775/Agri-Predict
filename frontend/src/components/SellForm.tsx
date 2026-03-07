import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TEXTS } from '../constants';
import { colors } from '../styles';
import { Language, MarketplaceCategory, Product } from '../types';

interface SellFormProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  language: Language;
}

const SellForm: React.FC<SellFormProps> = ({ onAddProduct, language }) => {
  const [category, setCategory] = useState<MarketplaceCategory | ''>('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState('');
  const [sellOrRent, setSellOrRent] = useState<'sell' | 'rent'>('sell');
  const [description, setDescription] = useState('');
  // Seller contact fields
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const T = TEXTS[language];

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!category || !name || !price) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (!sellerName || !sellerPhone) {
      Alert.alert('Error', 'Please provide your name and phone number so buyers can contact you');
      return;
    }
    if (sellerPhone.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    let unit = '';
    if (category === MarketplaceCategory.Crops || category === MarketplaceCategory.Fertilizers) unit = 'kg';
    if (category === MarketplaceCategory.Chemicals) unit = 'litre';
    if (category === MarketplaceCategory.Machineries) unit = sellOrRent === 'rent' ? 'hour' : 'fixed';

    const newProduct: Omit<Product, 'id'> = {
      category,
      name,
      price: parseFloat(price),
      image: imageUri || 'https://via.placeholder.com/400x300?text=Product+Image',
      unit,
      sellerName,
      sellerPhone,
      description,
      ...(category !== MarketplaceCategory.Machineries ||
        (category === MarketplaceCategory.Machineries && sellOrRent === 'sell')
        ? { quantity: parseFloat(quantity) }
        : {}),
      ...(category === MarketplaceCategory.Chemicals ? { expiryDate } : {}),
      ...(category === MarketplaceCategory.Machineries ? { sellOrRent } : {}),
    };

    onAddProduct(newProduct);

    // Reset form
    setCategory('');
    setName('');
    setQuantity('');
    setPrice('');
    setImageUri('');
    setExpiryDate('');
    setSellOrRent('sell');
    setDescription('');
    setSellerName('');
    setSellerPhone('');
  };

  const categories = Object.values(MarketplaceCategory);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{T.sellYourProduct}</Text>

      {/* Seller Contact Info - Always visible */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>📞 Your Contact Details</Text>
        <Text style={styles.sectionSubtitle}>Buyers will use this to reach you</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Your Name *</Text>
        <TextInput
          style={styles.input}
          value={sellerName}
          onChangeText={setSellerName}
          placeholder="Enter your full name"
          placeholderTextColor={colors.gray400}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone Number *</Text>
        <TextInput
          style={styles.input}
          value={sellerPhone}
          onChangeText={setSellerPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          maxLength={13}
          placeholderTextColor={colors.gray400}
        />
      </View>

      {/* Product Details */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>📦 Product Details</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>{T.category} *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue as MarketplaceCategory)}
          >
            <Picker.Item label={T.selectCategory} value="" />
            {categories.map((cat) => (
              <Picker.Item key={cat} label={T[cat]} value={cat} />
            ))}
          </Picker>
        </View>
      </View>

      {category && (
        <>
          <View style={styles.formGroup}>
            <Text style={styles.label}>{T.productName} *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter product name"
              placeholderTextColor={colors.gray400}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your product (quality, variety, etc.)"
              placeholderTextColor={colors.gray400}
              multiline
            />
          </View>

          {category === MarketplaceCategory.Machineries ? (
            <>
              <View style={styles.formGroup}>
                <Text style={styles.label}>{T.sellOrRent}</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={sellOrRent}
                    onValueChange={(itemValue) => setSellOrRent(itemValue as 'sell' | 'rent')}
                  >
                    <Picker.Item label={T.sell} value="sell" />
                    <Picker.Item label={T.rent} value="rent" />
                  </Picker>
                </View>
              </View>

              {sellOrRent === 'sell' && (
                <View style={styles.formGroup}>
                  <Text style={styles.label}>{T.quantity}</Text>
                  <TextInput
                    style={styles.input}
                    value={quantity}
                    onChangeText={setQuantity}
                    placeholder="Enter quantity"
                    keyboardType="numeric"
                    placeholderTextColor={colors.gray400}
                  />
                </View>
              )}

              <View style={styles.formGroup}>
                <Text style={styles.label}>
                  {T.price} * ({sellOrRent === 'rent' ? T.perHour : T.fixedPrice})
                </Text>
                <TextInput
                  style={styles.input}
                  value={price}
                  onChangeText={setPrice}
                  placeholder="Enter price"
                  keyboardType="numeric"
                  placeholderTextColor={colors.gray400}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.formGroup}>
                <Text style={styles.label}>
                  {T.quantity} * ({category === MarketplaceCategory.Chemicals ? 'litres' : 'kg'})
                </Text>
                <TextInput
                  style={styles.input}
                  value={quantity}
                  onChangeText={setQuantity}
                  placeholder="Enter quantity"
                  keyboardType="numeric"
                  placeholderTextColor={colors.gray400}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>
                  {T.price} * ({category === MarketplaceCategory.Chemicals ? T.perLitre : T.perKg})
                </Text>
                <TextInput
                  style={styles.input}
                  value={price}
                  onChangeText={setPrice}
                  placeholder="Enter price"
                  keyboardType="numeric"
                  placeholderTextColor={colors.gray400}
                />
              </View>
            </>
          )}

          {category === MarketplaceCategory.Chemicals && (
            <View style={styles.formGroup}>
              <Text style={styles.label}>{T.expiryDate} *</Text>
              <TextInput
                style={styles.input}
                value={expiryDate}
                onChangeText={setExpiryDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.gray400}
              />
            </View>
          )}

          <View style={styles.formGroup}>
            <Text style={styles.label}>{T.image}</Text>
            <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
              <Text style={styles.imageButtonText}>
                {imageUri ? '✓ Image Selected' : '📷 Select Image'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{T.postAd}</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray50,
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray900,
    marginBottom: 20,
  },
  sectionHeader: {
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray800,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.gray500,
    marginTop: 2,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray700,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray200,
    fontSize: 14,
    color: colors.gray900,
  },
  pickerContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray200,
    overflow: 'hidden',
  },
  imageButton: {
    backgroundColor: colors.green100,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  imageButtonText: {
    color: colors.green700,
    fontWeight: '600',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SellForm;