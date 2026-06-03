import { motion } from "framer-motion";
import { FiDroplet } from "react-icons/fi";
import WeatherIcon from "./WeatherIcon";
import { formatPercentage, formatTemperatureCompact } from "../utils/date";
import { getWeatherAccent, getWeatherLabel } from "../utils/weather";
import type { WeatherDashboardData } from "../types/weather";

export default function CurrentWeather({
  data,
}: {
  data: WeatherDashboardData;
}) {
  const accentClass = getWeatherAccent(data.current.weather_code);
  const feelsLike = formatTemperatureCompact(data.current.apparent_temperature);
  const currentTemp = formatTemperatureCompact(data.current.temperature_2m);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="glass-card relative overflow-hidden p-4 sm:p-6 md:p-8"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accentClass} opacity-70`}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4 sm:space-y-5">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-400 text-[10px] sm:text-xs">
              {data.location.region
                ? `${data.location.name}, ${data.location.region}`
                : data.location.name}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              {data.location.name}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <FiDroplet className="text-sky-300" />
              Chance of rain:{" "}
              {formatPercentage(data.current.precipitation_probability)}
            </p>
          </div>

          <div className="flex items-end gap-3 sm:gap-4">
            <span className="text-8xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
              {currentTemp}
            </span>
            <div className="pb-2 text-sm text-slate-300 space-y-2">
              <p>Feels like {feelsLike}</p>
              <p>{getWeatherLabel(data.current.weather_code)}</p>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[112px] items-center justify-center lg:min-h-[180px]">
          <div className="absolute h-48 w-48 rounded-full bg-sky-400/10 blur-3xl sm:h-56 sm:w-56" />
          <WeatherIcon
            code={data.current.weather_code}
            isDay={data.current.is_day === 1}
            size={1.5}
            className="relative z-10 text-amber-300 drop-shadow-[0_20px_40px_rgba(251,191,36,0.25)]"
          />
        </div>
      </div>
    </motion.section>
  );
}
