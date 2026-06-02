import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../api/weather.api';
import { searchCities, toWeatherLocation } from '../api/geocoding.api';
import { useDebounce } from './useDebounce';
import { useWeatherStore } from '../store/weatherStore';
import type {
  DailyForecastItem,
  HourlyForecastItem,
  WeatherDashboardData,
  WeatherLocation,
} from '../types/weather';

export function useWeatherDashboard() {
  const city = useWeatherStore((state) => state.city);
  const unit = useWeatherStore((state) => state.unit);
  const setCity = useWeatherStore((state) => state.setCity);
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation | null>(null);
  const [lastResolvedLocation, setLastResolvedLocation] = useState<WeatherLocation | null>(null);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);

  const debouncedCity = useDebounce(city.trim(), 450);

  const geocodingQuery = useQuery({
    queryKey: ['geocoding', debouncedCity],
    queryFn: () => searchCities(debouncedCity),
    enabled: debouncedCity.length >= 2,
  });

  const suggestions = geocodingQuery.data ?? [];
  const fallbackLocation = suggestions[0] ? toWeatherLocation(suggestions[0]) : null;
  const activeLocation = selectedLocation ?? fallbackLocation ?? lastResolvedLocation;

  useEffect(() => {
    if (selectedLocation) {
      setLastResolvedLocation(selectedLocation);
      return;
    }

    if (fallbackLocation) {
      setLastResolvedLocation(fallbackLocation);
    }
  }, [fallbackLocation, selectedLocation]);

  const weatherQuery = useQuery({
    queryKey: [
      'weather',
      activeLocation?.latitude,
      activeLocation?.longitude,
      unit,
    ],
    queryFn: () =>
      fetchWeather({
        latitude: activeLocation!.latitude,
        longitude: activeLocation!.longitude,
        unit,
      }),
    enabled: Boolean(activeLocation),
    refetchInterval: 10 * 60 * 1000,
    refetchIntervalInBackground: false,
  });

  const dashboardData = useMemo<WeatherDashboardData | null>(() => {
    if (!weatherQuery.data || !activeLocation) {
      return null;
    }

    const { current, hourly, daily } = weatherQuery.data;

    const currentHourIndex = hourly.time.findIndex((time) => time >= current.time);
    const hourlyStartIndex = currentHourIndex >= 0 ? currentHourIndex : 0;
    const hourlyItems: HourlyForecastItem[] = hourly.time
      .slice(hourlyStartIndex, hourlyStartIndex + 12)
      .map((time, index) => {
        const sourceIndex = hourlyStartIndex + index;
        return {
          time,
          temperature: hourly.temperature_2m[sourceIndex],
          code: hourly.weather_code[sourceIndex],
          precipitationProbability: hourly.precipitation_probability[sourceIndex],
          windSpeed: hourly.wind_speed_10m[sourceIndex],
          isDay: hourly.is_day[sourceIndex] === 1,
        };
      });

    const dailyItems: DailyForecastItem[] = daily.time.slice(0, 7).map((time, index) => ({
      time,
      code: daily.weather_code[index],
      minTemp: daily.temperature_2m_min[index],
      maxTemp: daily.temperature_2m_max[index],
      precipitationProbability: daily.precipitation_probability_max[index],
      windSpeed: daily.wind_speed_10m_max[index],
    }));

    return {
      location: activeLocation,
      current,
      hourly: hourlyItems,
      daily: dailyItems,
    };
  }, [activeLocation, weatherQuery.data]);

  const handleCityChange = (nextCity: string) => {
    setSelectedLocation(null);
    setIsSuggestionOpen(true);
    setCity(nextCity);
  };

  const handleSelectSuggestion = (suggestion: WeatherLocation) => {
    setSelectedLocation(suggestion);
    setIsSuggestionOpen(false);
    setCity(suggestion.name);
  };

  const handleSearchFocus = () => {
    if (city.trim().length >= 2) {
      setIsSuggestionOpen(true);
    }
  };

  return {
    city,
    unit,
    setUnit: useWeatherStore((state) => state.setUnit),
    handleCityChange,
    handleSelectSuggestion,
    handleSearchFocus,
    isSuggestionOpen,
    suggestions,
    isSearching: geocodingQuery.isFetching,
    isWeatherLoading: weatherQuery.isFetching,
    isWeatherError: weatherQuery.isError,
    dashboardData,
    weatherError: weatherQuery.error,
  };
}
