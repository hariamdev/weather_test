import { WeatherData, ForecastDay, LocationData } from '@/types/weather';

// Mock weather data - in production, you'd use a real API like OpenWeatherMap
const mockCurrentWeather: WeatherData = {
  location: 'New York, NY',
  temperature: 22,
  condition: 'Partly Cloudy',
  description: 'Partly cloudy with light breeze',
  humidity: 65,
  windSpeed: 12,
  windDirection: 180,
  pressure: 1013,
  uvIndex: 6,
  visibility: 10,
  feelsLike: 24,
  sunrise: '06:30',
  sunset: '19:45',
  icon: 'partly-cloudy'
};

const mockForecast: ForecastDay[] = [
  {
    date: 'Today',
    high: 24,
    low: 18,
    condition: 'Partly Cloudy',
    icon: 'partly-cloudy',
    humidity: 65,
    windSpeed: 12,
    precipitation: 20,
    hourlyData: [
      { time: '12:00', temperature: 22, condition: 'Sunny', icon: 'sunny', precipitation: 0 },
      { time: '13:00', temperature: 23, condition: 'Sunny', icon: 'sunny', precipitation: 0 },
      { time: '14:00', temperature: 24, condition: 'Partly Cloudy', icon: 'partly-cloudy', precipitation: 10 },
      { time: '15:00', temperature: 23, condition: 'Cloudy', icon: 'cloudy', precipitation: 30 },
    ]
  },
  {
    date: 'Tomorrow',
    high: 26,
    low: 20,
    condition: 'Sunny',
    icon: 'sunny',
    humidity: 55,
    windSpeed: 8,
    precipitation: 5,
    hourlyData: []
  },
  {
    date: 'Wednesday',
    high: 28,
    low: 22,
    condition: 'Sunny',
    icon: 'sunny',
    humidity: 50,
    windSpeed: 10,
    precipitation: 0,
    hourlyData: []
  },
  {
    date: 'Thursday',
    high: 25,
    low: 19,
    condition: 'Rainy',
    icon: 'rainy',
    humidity: 80,
    windSpeed: 15,
    precipitation: 85,
    hourlyData: []
  },
  {
    date: 'Friday',
    high: 23,
    low: 17,
    condition: 'Cloudy',
    icon: 'cloudy',
    humidity: 70,
    windSpeed: 14,
    precipitation: 40,
    hourlyData: []
  }
];

const mockLocations: LocationData[] = [
  { name: 'New York', country: 'USA', region: 'NY', lat: 40.7128, lon: -74.0060 },
  { name: 'London', country: 'UK', region: 'England', lat: 51.5074, lon: -0.1278 },
  { name: 'Tokyo', country: 'Japan', region: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Sydney', country: 'Australia', region: 'NSW', lat: -33.8688, lon: 151.2093 },
  { name: 'Paris', country: 'France', region: 'Île-de-France', lat: 48.8566, lon: 2.3522 },
];

export const fetchCurrentWeather = async (location?: string): Promise<WeatherData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (location && location !== 'New York, NY') {
    return {
      ...mockCurrentWeather,
      location,
      temperature: Math.floor(Math.random() * 30) + 10,
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 20) + 5,
    };
  }
  
  return mockCurrentWeather;
};

export const fetchForecast = async (location?: string): Promise<ForecastDay[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockForecast;
};

export const searchLocations = async (query: string): Promise<LocationData[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockLocations.filter(location => 
    location.name.toLowerCase().includes(query.toLowerCase()) ||
    location.country.toLowerCase().includes(query.toLowerCase())
  );
};