import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

interface WeatherCardProps {
  children: React.ReactNode;
  style?: any;
}

export default function WeatherCard({ children, style }: WeatherCardProps) {
  return (
    <BlurView intensity={20} tint="light" style={[styles.card, style]}>
      <View style={styles.cardContent}>
        {children}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  cardContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
  },
});