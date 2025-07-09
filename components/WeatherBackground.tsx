import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface WeatherBackgroundProps {
  condition: string;
  children: React.ReactNode;
}

export default function WeatherBackground({ condition, children }: WeatherBackgroundProps) {
  const getGradientColors = () => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return ['#FFD700', '#FF8C00', '#FF6B6B'];
      case 'partly cloudy':
        return ['#87CEEB', '#4682B4', '#2F4F4F'];
      case 'cloudy':
        return ['#708090', '#2F4F4F', '#1C1C1C'];
      case 'rainy':
        return ['#4B79A1', '#283E51', '#1C1C1C'];
      case 'thunderstorm':
        return ['#2C3E50', '#1C1C1C', '#000000'];
      case 'snow':
        return ['#E6E6FA', '#B0C4DE', '#4682B4'];
      default:
        return ['#87CEEB', '#4682B4', '#2F4F4F'];
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});