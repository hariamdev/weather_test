import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Settings, 
  Thermometer, 
  Bell, 
  MapPin, 
  Moon, 
  Info, 
  ChevronRight,
  Palette
} from 'lucide-react-native';
import WeatherBackground from '@/components/WeatherBackground';
import WeatherCard from '@/components/WeatherCard';

export default function SettingsScreen() {
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');
  const [windUnit, setWindUnit] = useState('kmh');
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleTemperatureUnitChange = () => {
    Alert.alert(
      'Temperature Unit',
      'Choose your preferred temperature unit',
      [
        { text: 'Celsius (°C)', onPress: () => setTemperatureUnit('celsius') },
        { text: 'Fahrenheit (°F)', onPress: () => setTemperatureUnit('fahrenheit') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleWindUnitChange = () => {
    Alert.alert(
      'Wind Speed Unit',
      'Choose your preferred wind speed unit',
      [
        { text: 'km/h', onPress: () => setWindUnit('kmh') },
        { text: 'mph', onPress: () => setWindUnit('mph') },
        { text: 'm/s', onPress: () => setWindUnit('ms') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About Weather App',
      'Weather App v1.0.0\n\nA beautiful and intuitive weather application built with React Native and Expo.\n\nFeatures:\n• Real-time weather data\n• 5-day forecast\n• Location search\n• Customizable settings\n\n© 2024 Weather App'
    );
  };

  return (
    <WeatherBackground condition="partly cloudy">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Settings size={24} color="#ffffff" />
            <Text style={styles.headerTitle}>Settings</Text>
          </View>
        </View>

        {/* Units */}
        <WeatherCard>
          <Text style={styles.sectionTitle}>Units</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleTemperatureUnitChange}>
            <View style={styles.settingLeft}>
              <Thermometer size={20} color="#ffffff" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Temperature</Text>
                <Text style={styles.settingValue}>
                  {temperatureUnit === 'celsius' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="rgba(255, 255, 255, 0.5)" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleWindUnitChange}>
            <View style={styles.settingLeft}>
              <Settings size={20} color="#ffffff" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Wind Speed</Text>
                <Text style={styles.settingValue}>
                  {windUnit === 'kmh' ? 'km/h' : windUnit === 'mph' ? 'mph' : 'm/s'}
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="rgba(255, 255, 255, 0.5)" />
          </TouchableOpacity>
        </WeatherCard>

        {/* Notifications */}
        <WeatherCard>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Bell size={20} color="#ffffff" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Weather Alerts</Text>
                <Text style={styles.settingValue}>
                  {notifications ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: 'rgba(255, 255, 255, 0.3)', true: '#4CAF50' }}
              thumbColor={notifications ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </WeatherCard>

        {/* Privacy */}
        <WeatherCard>
          <Text style={styles.sectionTitle}>Privacy</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MapPin size={20} color="#ffffff" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Location Services</Text>
                <Text style={styles.settingValue}>
                  {locationServices ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </View>
            <Switch
              value={locationServices}
              onValueChange={setLocationServices}
              trackColor={{ false: 'rgba(255, 255, 255, 0.3)', true: '#4CAF50' }}
              thumbColor={locationServices ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </WeatherCard>

        {/* Appearance */}
        <WeatherCard>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Moon size={20} color="#ffffff" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Dark Mode</Text>
                <Text style={styles.settingValue}>
                  {darkMode ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: 'rgba(255, 255, 255, 0.3)', true: '#4CAF50' }}
              thumbColor={darkMode ? '#ffffff' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('Theme', 'Theme customization coming soon!')}>
            <View style={styles.settingLeft}>
              <Palette size={20} color="#ffffff" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Theme</Text>
                <Text style={styles.settingValue}>Default</Text>
              </View>
            </View>
            <ChevronRight size={20} color="rgba(255, 255, 255, 0.5)" />
          </TouchableOpacity>
        </WeatherCard>

        {/* About */}
        <WeatherCard>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleAbout}>
            <View style={styles.settingLeft}>
              <Info size={20} color="#ffffff" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>About Weather App</Text>
                <Text style={styles.settingValue}>Version 1.0.0</Text>
              </View>
            </View>
            <ChevronRight size={20} color="rgba(255, 255, 255, 0.5)" />
          </TouchableOpacity>
        </WeatherCard>

        <View style={styles.bottomPadding} />
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
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  settingValue: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  bottomPadding: {
    height: 100,
  },
});