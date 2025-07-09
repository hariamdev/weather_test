import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Droplets, Wind, ChevronRight } from 'lucide-react-native';
import WeatherBackground from '@/components/WeatherBackground';
import WeatherCard from '@/components/WeatherCard';
import WeatherIcon from '@/components/WeatherIcon';
import { fetchForecast } from '@/utils/weatherApi';
import { ForecastDay } from '@/types/weather';

export default function ForecastScreen() {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDay, setSelectedDay] = useState<ForecastDay | null>(null);

  const loadForecast = async () => {
    try {
      const data = await fetchForecast();
      setForecast(data);
      setSelectedDay(data[0]);
    } catch (error) {
      console.error('Error loading forecast:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadForecast();
    setRefreshing(false);
  };

  useEffect(() => {
    loadForecast();
  }, []);

  if (loading) {
    return (
      <WeatherBackground condition="partly cloudy">
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading forecast...</Text>
          </View>
        </SafeAreaView>
      </WeatherBackground>
    );
  }

  return (
    <WeatherBackground condition={selectedDay?.condition || "partly cloudy"}>
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
            <View style={styles.headerContent}>
              <Calendar size={24} color="#ffffff" />
              <Text style={styles.headerTitle}>5-Day Forecast</Text>
            </View>
          </View>

          {/* Forecast List */}
          <WeatherCard>
            <Text style={styles.sectionTitle}>Daily Forecast</Text>
            {forecast.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.forecastItem,
                  selectedDay?.date === day.date && styles.selectedForecastItem
                ]}
                onPress={() => setSelectedDay(day)}
              >
                <View style={styles.forecastLeft}>
                  <WeatherIcon condition={day.condition} size={32} />
                  <View style={styles.forecastInfo}>
                    <Text style={styles.forecastDate}>{day.date}</Text>
                    <Text style={styles.forecastCondition}>{day.condition}</Text>
                  </View>
                </View>
                <View style={styles.forecastRight}>
                  <Text style={styles.forecastTemp}>{day.high}°/{day.low}°</Text>
                  <View style={styles.forecastDetails}>
                    <Droplets size={12} color="rgba(255, 255, 255, 0.7)" />
                    <Text style={styles.forecastDetailText}>{day.precipitation}%</Text>
                  </View>
                </View>
                <ChevronRight size={16} color="rgba(255, 255, 255, 0.5)" />
              </TouchableOpacity>
            ))}
          </WeatherCard>

          {/* Selected Day Details */}
          {selectedDay && (
            <WeatherCard>
              <Text style={styles.sectionTitle}>{selectedDay.date} Details</Text>
              <View style={styles.dayDetails}>
                <View style={styles.dayHeader}>
                  <WeatherIcon condition={selectedDay.condition} size={48} />
                  <View style={styles.dayHeaderInfo}>
                    <Text style={styles.dayCondition}>{selectedDay.condition}</Text>
                    <Text style={styles.dayTemp}>{selectedDay.high}° / {selectedDay.low}°</Text>
                  </View>
                </View>
                
                <View style={styles.dayDetailsGrid}>
                  <View style={styles.dayDetailItem}>
                    <Droplets size={18} color="#ffffff" />
                    <Text style={styles.dayDetailLabel}>Humidity</Text>
                    <Text style={styles.dayDetailValue}>{selectedDay.humidity}%</Text>
                  </View>
                  <View style={styles.dayDetailItem}>
                    <Wind size={18} color="#ffffff" />
                    <Text style={styles.dayDetailLabel}>Wind</Text>
                    <Text style={styles.dayDetailValue}>{selectedDay.windSpeed} km/h</Text>
                  </View>
                  <View style={styles.dayDetailItem}>
                    <Droplets size={18} color="#ffffff" />
                    <Text style={styles.dayDetailLabel}>Rain</Text>
                    <Text style={styles.dayDetailValue}>{selectedDay.precipitation}%</Text>
                  </View>
                </View>
              </View>
            </WeatherCard>
          )}

          {/* Hourly Forecast */}
          {selectedDay && selectedDay.hourlyData.length > 0 && (
            <WeatherCard>
              <Text style={styles.sectionTitle}>Hourly Forecast</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.hourlyContainer}>
                  {selectedDay.hourlyData.map((hour, index) => (
                    <View key={index} style={styles.hourlyItem}>
                      <Text style={styles.hourlyTime}>{hour.time}</Text>
                      <WeatherIcon condition={hour.condition} size={24} />
                      <Text style={styles.hourlyTemp}>{hour.temperature}°</Text>
                      <View style={styles.hourlyPrecipitation}>
                        <Droplets size={12} color="rgba(255, 255, 255, 0.7)" />
                        <Text style={styles.hourlyPrecipitationText}>{hour.precipitation}%</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </WeatherCard>
          )}

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
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedForecastItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  forecastLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  forecastInfo: {
    marginLeft: 12,
  },
  forecastDate: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  forecastCondition: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  forecastRight: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  forecastTemp: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  forecastDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  forecastDetailText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  dayDetails: {
    marginTop: 8,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dayHeaderInfo: {
    marginLeft: 16,
  },
  dayCondition: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
  },
  dayTemp: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  dayDetailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayDetailItem: {
    alignItems: 'center',
  },
  dayDetailLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 8,
    marginBottom: 4,
  },
  dayDetailValue: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  hourlyContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  hourlyItem: {
    alignItems: 'center',
    marginRight: 24,
    minWidth: 60,
  },
  hourlyTime: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  hourlyTemp: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginTop: 8,
    marginBottom: 4,
  },
  hourlyPrecipitation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hourlyPrecipitationText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    marginLeft: 2,
  },
  bottomPadding: {
    height: 100,
  },
});