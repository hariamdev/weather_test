import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Heart, Star, Trash2 } from 'lucide-react-native';
import WeatherBackground from '@/components/WeatherBackground';
import WeatherCard from '@/components/WeatherCard';
import { searchLocations } from '@/utils/weatherApi';
import { LocationData } from '@/types/weather';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [favorites, setFavorites] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const results = await searchLocations(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (location: LocationData) => {
    const isAlreadyFavorite = favorites.some(fav => fav.name === location.name);
    if (!isAlreadyFavorite) {
      setFavorites([...favorites, location]);
      Alert.alert('Added to Favorites', `${location.name} has been added to your favorites.`);
    }
  };

  const removeFromFavorites = (location: LocationData) => {
    setFavorites(favorites.filter(fav => fav.name !== location.name));
  };

  const isLocationFavorite = (location: LocationData) => {
    return favorites.some(fav => fav.name === location.name);
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const renderLocationItem = ({ item }: { item: LocationData }) => {
    const isFavorite = isLocationFavorite(item);
    
    return (
      <TouchableOpacity
        style={styles.locationItem}
        onPress={() => {
          Alert.alert(
            'Location Selected',
            `Weather for ${item.name}, ${item.country}`,
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'View Weather', onPress: () => console.log('View weather for', item.name) },
            ]
          );
        }}
      >
        <View style={styles.locationInfo}>
          <MapPin size={18} color="#ffffff" />
          <View style={styles.locationText}>
            <Text style={styles.locationName}>{item.name}</Text>
            <Text style={styles.locationDetails}>{item.region}, {item.country}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => {
            if (isFavorite) {
              removeFromFavorites(item);
            } else {
              addToFavorites(item);
            }
          }}
        >
          <Heart
            size={20}
            color={isFavorite ? "#FF6B6B" : "rgba(255, 255, 255, 0.5)"}
            fill={isFavorite ? "#FF6B6B" : "transparent"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderFavoriteItem = ({ item }: { item: LocationData }) => (
    <TouchableOpacity
      style={styles.favoriteItem}
      onPress={() => {
        Alert.alert(
          'Location Selected',
          `Weather for ${item.name}, ${item.country}`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'View Weather', onPress: () => console.log('View weather for', item.name) },
          ]
        );
      }}
    >
      <View style={styles.favoriteInfo}>
        <Star size={16} color="#FFD700" fill="#FFD700" />
        <View style={styles.favoriteText}>
          <Text style={styles.favoriteName}>{item.name}</Text>
          <Text style={styles.favoriteDetails}>{item.region}, {item.country}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromFavorites(item)}
      >
        <Trash2 size={16} color="rgba(255, 255, 255, 0.5)" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <WeatherBackground condition="partly cloudy">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Search size={24} color="#ffffff" />
            <Text style={styles.headerTitle}>Search Locations</Text>
          </View>
        </View>

        {/* Search Input */}
        <WeatherCard style={styles.searchCard}>
          <View style={styles.searchContainer}>
            <Search size={20} color="rgba(255, 255, 255, 0.7)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a city..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="words"
            />
          </View>
        </WeatherCard>

        {/* Search Results */}
        {searchQuery.length >= 2 && (
          <WeatherCard>
            <Text style={styles.sectionTitle}>Search Results</Text>
            {loading ? (
              <Text style={styles.loadingText}>Searching...</Text>
            ) : searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                renderItem={renderLocationItem}
                keyExtractor={(item) => `${item.name}-${item.country}`}
                showsVerticalScrollIndicator={false}
                style={styles.resultsList}
              />
            ) : (
              <Text style={styles.noResultsText}>No locations found</Text>
            )}
          </WeatherCard>
        )}

        {/* Favorites */}
        {favorites.length > 0 && (
          <WeatherCard>
            <Text style={styles.sectionTitle}>Favorite Locations</Text>
            <FlatList
              data={favorites}
              renderItem={renderFavoriteItem}
              keyExtractor={(item) => `fav-${item.name}-${item.country}`}
              showsVerticalScrollIndicator={false}
              style={styles.favoritesList}
            />
          </WeatherCard>
        )}

        {/* Quick Access */}
        {searchQuery.length === 0 && favorites.length === 0 && (
          <WeatherCard>
            <Text style={styles.sectionTitle}>Quick Access</Text>
            <Text style={styles.quickAccessText}>
              Search for cities to get weather information and add them to your favorites for quick access.
            </Text>
            <View style={styles.quickAccessItems}>
              <TouchableOpacity
                style={styles.quickAccessItem}
                onPress={() => setSearchQuery('New York')}
              >
                <MapPin size={16} color="#ffffff" />
                <Text style={styles.quickAccessItemText}>New York</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAccessItem}
                onPress={() => setSearchQuery('London')}
              >
                <MapPin size={16} color="#ffffff" />
                <Text style={styles.quickAccessItemText}>London</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickAccessItem}
                onPress={() => setSearchQuery('Tokyo')}
              >
                <MapPin size={16} color="#ffffff" />
                <Text style={styles.quickAccessItemText}>Tokyo</Text>
              </TouchableOpacity>
            </View>
          </WeatherCard>
        )}
      </SafeAreaView>
    </WeatherBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginLeft: 12,
  },
  searchCard: {
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginLeft: 12,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    paddingVertical: 20,
  },
  noResultsText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    paddingVertical: 20,
  },
  resultsList: {
    maxHeight: 200,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    marginLeft: 12,
  },
  locationName: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  locationDetails: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  favoriteButton: {
    padding: 8,
  },
  favoritesList: {
    maxHeight: 200,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  favoriteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  favoriteText: {
    marginLeft: 12,
  },
  favoriteName: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  favoriteDetails: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  removeButton: {
    padding: 8,
  },
  quickAccessText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  quickAccessItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAccessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  quickAccessItemText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
});