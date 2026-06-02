import {
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiHail,
  WiNightClear,
  WiRain,
  WiSnow,
  WiStormShowers,
  WiStrongWind,
} from 'react-icons/wi';
import { motion } from 'framer-motion';
import { getWeatherIconName } from '../utils/weather';

const iconMap = {
  sunny: WiDaySunny,
  clearNight: WiNightClear,
  partlyCloudy: WiDayCloudy,
  cloudy: WiCloudy,
  fog: WiFog,
  rain: WiRain,
  snow: WiSnow,
  storm: WiStormShowers,
  sleet: WiHail,
  wind: WiStrongWind,
  hail: WiHail,
  unknown: WiCloudy,
} as const;

export default function WeatherIcon({
  code,
  isDay,
  size = 1,
  className = '',
  animate = true,
}: {
  code: number;
  isDay: boolean;
  size?: number;
  className?: string;
  animate?: boolean;
}) {
  const iconName = getWeatherIconName(code, isDay);
  const Icon = iconMap[iconName] ?? WiCloudy;

  const iconNode = <Icon className={className} size={size * 56} aria-hidden="true" />;

  if (!animate) {
    return iconNode;
  }

  return (
    <motion.div
      animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      className="inline-flex"
    >
      {iconNode}
    </motion.div>
  );
}

export function TinyWeatherIcon({
  code,
  isDay,
  className = '',
}: {
  code: number;
  isDay: boolean;
  className?: string;
}) {
  const iconName = getWeatherIconName(code, isDay);
  const Icon = iconMap[iconName] ?? WiCloudy;
  return <Icon className={className} size={28} aria-hidden="true" />;
}
