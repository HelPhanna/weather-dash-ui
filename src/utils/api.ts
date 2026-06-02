export function getEnv(name: 'VITE_WEATHER_BASE_URL' | 'VITE_GEOCODING_BASE_URL') {
  return import.meta.env[name] as string;
}
