import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import { formatCurrency } from '../utils/formatCurrency';

const PRODUCTS_ENDPOINT = 'https://fakestoreapi.com/products';
const CATEGORIES_ENDPOINT = 'https://fakestoreapi.com/products/categories';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async (category, { skipSpinner = false } = {}) => {
    try {
      if (!skipSpinner) {
        setLoading(true);
      }
      setError('');
      const url = category
        ? `${PRODUCTS_ENDPOINT}/category/${encodeURIComponent(category)}`
        : PRODUCTS_ENDPOINT;
      const response = await axios.get(url);
      setProducts(response.data || []);
    } catch (_error) {
      setError('Não foi possível carregar os produtos. Tente novamente.');
    } finally {
      if (!skipSpinner) {
        setLoading(false);
      }
      setRefreshing(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(CATEGORIES_ENDPOINT);
      setCategories(response.data || []);
    } catch (_error) {
      setCategories(['electronics', "jewelery", "men's clothing", "women's clothing"]);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchProducts(null);
  }, [fetchCategories, fetchProducts]);

  const handleSelectCategory = (category) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);
    fetchProducts(newCategory);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts(selectedCategory, { skipSpinner: true });
  };

  const renderProduct = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cardPrice}>{formatCurrency(item.price)}</Text>
      </View>
    </Pressable>
  );

  const renderEmpty = () => {
    if (loading) {
      return null;
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.filtersContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[null, ...categories]}
            keyExtractor={(item) => (item ? item : 'all')}
            renderItem={({ item }) => {
              const isActive = selectedCategory === item || (item === null && !selectedCategory);
              return (
                <Pressable
                  onPress={() => handleSelectCategory(item)}
                  style={({ pressed }) => [
                    styles.filterChip,
                    isActive && styles.filterChipActive,
                    pressed && styles.filterChipPressed,
                  ]}
                >
                  <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                    {item ? item : 'Todas'}
                  </Text>
                </Pressable>
              );
            }}
            contentContainerStyle={styles.filtersContent}
          />
        </View>

        {error ? (
          <Pressable style={styles.errorContainer} onPress={() => fetchProducts(selectedCategory)}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.errorAction}>Toque para tentar novamente</Text>
          </Pressable>
        ) : null}

        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderProduct}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        />

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#60a5fa" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Fundo escuro elegante
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a', // slate-900
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  // Filtros (chips)
  filtersContainer: {
    paddingVertical: 14,
  },
  filtersContent: {
    paddingRight: 8,
    paddingLeft: 2,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#334155', // slate-700
    backgroundColor: 'rgba(255,255,255,0.04)',
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: '#2563eb', // blue-600
    borderColor: '#2563eb',
  },
  filterChipPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  filterText: {
    color: '#cbd5e1', // slate-300
    fontWeight: '700',
    textTransform: 'capitalize',
    letterSpacing: 0.2,
  },
  filterTextActive: {
    color: '#ffffff',
  },

  // Lista e estados vazios
  listContent: {
    paddingBottom: 28,
    paddingTop: 4,
    gap: 10, // RN novo já aceita; se não, a FlatList lida sem problema
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#94a3b8', // slate-400
    fontSize: 14,
  },

  // Cards de produto (glass/dark)
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(2, 6, 23, 0.65)', // glass escuro
    borderWidth: 1,
    borderColor: '#1e293b', // slate-800
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    marginBottom: 10,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
  image: {
    width: 76,
    height: 76,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#0b1220',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardContent: {
    flex: 1,
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e5e7eb', // stone-200
    lineHeight: 20,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#60a5fa', // blue-400
    letterSpacing: 0.2,
  },

  // Loading overlay
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 6, 23, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Erro (mantido acessível e destacado no dark)
  errorContainer: {
    backgroundColor: '#fee2e2', // red-100
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fecaca', // red-200
  },
  errorText: {
    color: '#7f1d1d', // red-900
    fontWeight: '800',
  },
  errorAction: {
    marginTop: 4,
    color: '#991b1b', // red-800
    fontSize: 12,
    fontWeight: '600',
  },
});
