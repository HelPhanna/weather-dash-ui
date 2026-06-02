export type Unit = 'c' | 'f';

export interface WeatherStore {
  city: string;
  unit: Unit;
  setCity: (city: string) => void;
  setUnit: (unit: Unit) => void;
}

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  country?: string;
  admin1?: string;
  admin2?: string;
  timezone?: string;
  population?: number;
  country_code?: string;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
}

export interface WeatherCurrent {
  time: string;
  interval: number;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m?: number;
  precipitation_probability: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m?: number;
  is_day: number;
  uv_index: number;
}

export interface WeatherHourly {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  precipitation_probability: number[];
  wind_speed_10m: number[];
  is_day: number[];
}

export interface WeatherDaily {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
}

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current_units: {
    temperature_2m: string;
    apparent_temperature: string;
    wind_speed_10m: string;
  };
  current: WeatherCurrent;
  hourly: WeatherHourly;
  daily: WeatherDaily;
}

export interface WeatherLocation {
  name: string;
  country?: string;
  region?: string;
  latitude: number;
  longitude: number;
  timezone?: string;
}

export interface HourlyForecastItem {
  time: string;
  temperature: number;
  code: number;
  precipitationProbability: number;
  windSpeed: number;
  isDay: boolean;
}

export interface DailyForecastItem {
  time: string;
  code: number;
  minTemp: number;
  maxTemp: number;
  precipitationProbability: number;
  windSpeed: number;
}

export interface WeatherDashboardData {
  location: WeatherLocation;
  current: WeatherCurrent;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
}
