export type WeatherIconName =
  | 'sunny'
  | 'clearNight'
  | 'partlyCloudy'
  | 'cloudy'
  | 'fog'
  | 'rain'
  | 'snow'
  | 'storm'
  | 'sleet'
  | 'wind'
  | 'hail'
  | 'unknown';

const weatherMap: Record<
  number,
  { label: string; iconDay: WeatherIconName; iconNight: WeatherIconName; category: string }
> = {
  0: { label: 'Clear sky', iconDay: 'sunny', iconNight: 'clearNight', category: 'clear' },
  1: { label: 'Mainly clear', iconDay: 'sunny', iconNight: 'clearNight', category: 'clear' },
  2: {
    label: 'Partly cloudy',
    iconDay: 'partlyCloudy',
    iconNight: 'partlyCloudy',
    category: 'clouds',
  },
  3: { label: 'Overcast', iconDay: 'cloudy', iconNight: 'cloudy', category: 'clouds' },
  45: { label: 'Fog', iconDay: 'fog', iconNight: 'fog', category: 'mist' },
  48: { label: 'Rime fog', iconDay: 'fog', iconNight: 'fog', category: 'mist' },
  51: { label: 'Light drizzle', iconDay: 'rain', iconNight: 'rain', category: 'rain' },
  53: { label: 'Drizzle', iconDay: 'rain', iconNight: 'rain', category: 'rain' },
  55: { label: 'Dense drizzle', iconDay: 'rain', iconNight: 'rain', category: 'rain' },
  56: { label: 'Freezing drizzle', iconDay: 'sleet', iconNight: 'sleet', category: 'rain' },
  57: { label: 'Freezing drizzle', iconDay: 'sleet', iconNight: 'sleet', category: 'rain' },
  61: { label: 'Light rain', iconDay: 'rain', iconNight: 'rain', category: 'rain' },
  63: { label: 'Rain', iconDay: 'rain', iconNight: 'rain', category: 'rain' },
  65: { label: 'Heavy rain', iconDay: 'rain', iconNight: 'rain', category: 'rain' },
  66: { label: 'Freezing rain', iconDay: 'sleet', iconNight: 'sleet', category: 'rain' },
  67: { label: 'Freezing rain', iconDay: 'sleet', iconNight: 'sleet', category: 'rain' },
  71: { label: 'Light snow', iconDay: 'snow', iconNight: 'snow', category: 'snow' },
  73: { label: 'Snow', iconDay: 'snow', iconNight: 'snow', category: 'snow' },
  75: { label: 'Heavy snow', iconDay: 'snow', iconNight: 'snow', category: 'snow' },
  77: { label: 'Snow grains', iconDay: 'snow', iconNight: 'snow', category: 'snow' },
  80: { label: 'Rain showers', iconDay: 'rain', iconNight: 'rain', category: 'rain' },
  81: { label: 'Rain showers', iconDay: 'rain', iconNight: 'rain', category: 'rain' },
  82: { label: 'Violent rain showers', iconDay: 'rain', iconNight: 'rain', category: 'rain' },
  85: { label: 'Snow showers', iconDay: 'snow', iconNight: 'snow', category: 'snow' },
  86: { label: 'Heavy snow showers', iconDay: 'snow', iconNight: 'snow', category: 'snow' },
  95: { label: 'Thunderstorm', iconDay: 'storm', iconNight: 'storm', category: 'storm' },
  96: { label: 'Thunderstorm with hail', iconDay: 'storm', iconNight: 'storm', category: 'storm' },
  99: { label: 'Thunderstorm with hail', iconDay: 'storm', iconNight: 'storm', category: 'storm' },
};

export function getWeatherLabel(code: number) {
  return weatherMap[code]?.label ?? 'Unknown';
}

export function getWeatherCategory(code: number) {
  return weatherMap[code]?.category ?? 'unknown';
}

export function getWeatherIconName(code: number, isDay: boolean): WeatherIconName {
  const entry = weatherMap[code];
  if (!entry) {
    return 'unknown';
  }
  return isDay ? entry.iconDay : entry.iconNight;
}

export function getWeatherAccent(code: number) {
  const category = getWeatherCategory(code);
  switch (category) {
    case 'clear':
      return 'from-amber-400/30 via-orange-400/15 to-transparent';
    case 'clouds':
      return 'from-slate-300/20 via-slate-400/10 to-transparent';
    case 'rain':
      return 'from-sky-400/25 via-blue-400/12 to-transparent';
    case 'snow':
      return 'from-cyan-300/20 via-sky-400/10 to-transparent';
    case 'storm':
      return 'from-violet-400/20 via-fuchsia-400/10 to-transparent';
    default:
      return 'from-sky-400/20 via-cyan-400/10 to-transparent';
  }
}
