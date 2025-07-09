import { Sun, Cloud, CloudRain, CloudSnow, Zap, CloudDrizzle } from 'lucide-react-native';

interface WeatherIconProps {
  condition: string;
  size?: number;
  color?: string;
}

export default function WeatherIcon({ condition, size = 24, color = '#ffffff' }: WeatherIconProps) {
  const getIcon = () => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun size={size} color={color} />;
      case 'partly cloudy':
        return <Cloud size={size} color={color} />;
      case 'cloudy':
        return <Cloud size={size} color={color} />;
      case 'rainy':
        return <CloudRain size={size} color={color} />;
      case 'drizzle':
        return <CloudDrizzle size={size} color={color} />;
      case 'thunderstorm':
        return <Zap size={size} color={color} />;
      case 'snow':
        return <CloudSnow size={size} color={color} />;
      default:
        return <Sun size={size} color={color} />;
    }
  };

  return getIcon();
}