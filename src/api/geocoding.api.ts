import { geocodingClient } from './client';
import type { GeocodingResponse, GeocodingResult } from '../types/weather';

export async function searchCities(query: string) {
  const { data } = await geocodingClient.get<GeocodingResponse>('/search', {
    params: {
      name: query,
      count: 8,
      language: 'en',
      format: 'json',
    },
  });

  return data.results ?? [];
}

export function toWeatherLocation(result: GeocodingResult) {
  return {
    name: result.name,
    country: result.country,
    region: result.admin1,
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone,
  };
}
