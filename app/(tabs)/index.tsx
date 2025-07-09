import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Thermometer, Eye, Wind, Droplets, Gauge, Sun, Moon } from 'lucide-react-native';
import WeatherBackground from '@/components/WeatherBackground';
import WeatherCard from '@/components/WeatherCard';
import WeatherIcon from '@/components/WeatherIcon';
import { fetchCurrentWeather } from '@/utils/weatherApi';
import { WeatherData } from '@/types/weather';

export default function HomeScreen() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadWeather = async () => {
    try {
      const data = await fetchCurrentWeather();
      setWeather(data);
    } catch (error) {
      console.error('Error loading weather:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadWeather();
    setRefreshing(false);
  };

  useEffect(() => {
    loadWeather();
  }, []);

  if (loading || !weather) {
    return (
      <WeatherBackground condition="partly cloudy">
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading weather...</Text>
          </View>
        </SafeAreaView>
      </WeatherBackground>
    );
  }

  return (
    <WeatherBackground condition={weather.condition}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#ffffff" />
              <Text style={styles.locationText}>{weather.location}</Text>
            </View>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </View>

          {/* Current Weather */}
          <WeatherCard style={styles.currentWeatherCard}>
            <View style={styles.currentWeatherContainer}>
              <View style={styles.temperatureContainer}>
                <WeatherIcon condition={weather.condition} size={80} />
                <Text style={styles.temperature}>{weather.temperature}°</Text>
              </View>
              <Text style={styles.condition}>{weather.condition}</Text>
              <Text style={styles.description}>{weather.description}</Text>
              <Text style={styles.feelsLike}>Feels like {weather.feelsLike}°</Text>
            </View>
          </WeatherCard>

          {/* Weather Details */}
          <WeatherCard>
            <Text style={styles.sectionTitle}>Weather Details</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Thermometer size={20} color="#ffffff" />
                <Text style={styles.detailLabel}>Feels Like</Text>
                <Text style={styles.detailValue}>{weather.feelsLike}°</Text>
              </View>
              <View style={styles.detailItem}>
                <Droplets size={20} color="#ffffff" />
                <Text style={styles.detailLabel}>Humidity</Text>
                <Text style={styles.detailValue}>{weather.humidity}%</Text>
              </View>
              <View style={styles.detailItem}>
                <Wind size={20} color="#ffffff" />
                <Text style={styles.detailLabel}>Wind Speed</Text>
                <Text style={styles.detailValue}>{weather.windSpeed} km/h</Text>
              </View>
              <View style={styles.detailItem}>
                <Gauge size={20} color="#ffffff" />
                <Text style={styles.detailLabel}>Pressure</Text>
                <Text style={styles.detailValue}>{weather.pressure} hPa</Text>
              </View>
              <View style={styles.detailItem}>
                <Eye size={20} color="#ffffff" />
                <Text style={styles.detailLabel}>Visibility</Text>
                <Text style={styles.detailValue}>{weather.visibility} km</Text>
              </View>
              <View style={styles.detailItem}>
                <Sun size={20} color="#ffffff" />
                <Text style={styles.detailLabel}>UV Index</Text>
                <Text style={styles.detailValue}>{weather.uvIndex}</Text>
              </View>
            </View>
          </WeatherCard>

          {/* Sunrise & Sunset */}
          <WeatherCard>
            <Text style={styles.sectionTitle}>Sun & Moon</Text>
            <View style={styles.sunMoonContainer}>
              <View style={styles.sunMoonItem}>
                <Sun size={24} color="#FFD700" />
                <Text style={styles.sunMoonLabel}>Sunrise</Text>
                <Text style={styles.sunMoonValue}>{weather.sunrise}</Text>
              </View>
              <View style={styles.sunMoonItem}>
                <Moon size={24} color="#C0C0C0" />
                <Text style={styles.sunMoonLabel}>Sunset</Text>
                <Text style={styles.sunMoonValue}>{weather.sunset}</Text>
              </View>
            </View>
          </WeatherCard>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </SafeAreaView>
    </WeatherBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-Medium',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  dateText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  currentWeatherCard: {
    marginBottom: 16,
  },
  currentWeatherContainer: {
    alignItems: 'center',
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  temperature: {
    color: '#ffffff',
    fontSize: 72,
    fontFamily: 'Inter-Bold',
    marginLeft: 20,
  },
  condition: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  feelsLike: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 8,
    marginBottom: 4,
  },
  detailValue: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  sunMoonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sunMoonItem: {
    alignItems: 'center',
  },
  sunMoonLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 8,
    marginBottom: 4,
  },
  sunMoonValue: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  bottomPadding: {
    height: 100,
  },
});