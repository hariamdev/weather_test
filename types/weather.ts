export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  uvIndex: number;
  visibility: number;
  feelsLike: number;
  sunrise: string;
  sunset: string;
  icon: string;
}

export interface ForecastDay {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  hourlyData: HourlyWeather[];
}

export interface HourlyWeather {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
  precipitation: number;
}

export interface LocationData {
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
}