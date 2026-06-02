const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  timeZone: 'UTC',
});

const monthDayFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export function formatForecastHour(time: string) {
  const hour = Number(time.slice(11, 13));
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const normalized = hour % 12 === 0 ? 12 : hour % 12;
  return `${normalized}:00 ${suffix}`;
}

export function formatForecastDay(time: string) {
  const [year, month, day] = time.slice(0, 10).split('-').map(Number);
  return weekdayFormatter.format(new Date(Date.UTC(year, month - 1, day)));
}

export function formatForecastDayAndMonth(time: string) {
  const [year, month, day] = time.slice(0, 10).split('-').map(Number);
  return monthDayFormatter.format(new Date(Date.UTC(year, month - 1, day)));
}

export function formatTemperature(value: number, unit: 'c' | 'f') {
  return `${Math.round(value)}°${unit.toUpperCase()}`;
}

export function formatTemperatureCompact(value: number) {
  return `${Math.round(value)}°`;
}

export function formatWind(value: number, unitLabel: string) {
  const rounded = value >= 10 ? Math.round(value) : value.toFixed(1);
  return `${rounded} ${unitLabel}`;
}

export function formatPercentage(value: number) {
  return `${Math.round(value)}%`;
}

export function formatLocationLabel(
  name: string,
  region?: string,
  country?: string,
) {
  return [name, region, country].filter(Boolean).join(', ');
}
