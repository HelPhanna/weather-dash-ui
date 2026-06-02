import { weatherClient } from './client';
import type { Unit, WeatherApiResponse } from '../types/weather';

export async function fetchWeather({
  latitude,
  longitude,
  unit,
}: {
  latitude: number;
  longitude: number;
  unit: Unit;
}) {
  const { data } = await weatherClient.get<WeatherApiResponse>('/forecast', {
    params: {
      latitude,
      longitude,
      current:
        'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m,is_day,uv_index',
      hourly:
        'temperature_2m,weather_code,precipitation_probability,wind_speed_10m,is_day',
      daily:
        'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max',
      forecast_days: 7,
      timezone: 'auto',
      temperature_unit: unit === 'c' ? 'celsius' : 'fahrenheit',
      wind_speed_unit: unit === 'c' ? 'kmh' : 'mph',
    },
  });

  return data;
}
