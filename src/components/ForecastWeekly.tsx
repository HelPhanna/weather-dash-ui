import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';
import { formatForecastDay, formatTemperatureCompact } from '../utils/date';
import { getWeatherLabel } from '../utils/weather';
import type { DailyForecastItem } from '../types/weather';

export default function ForecastWeekly({
  items,
}: {
  items: DailyForecastItem[];
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.08 }}
      className="glass-card self-start p-4 sm:p-5 md:p-6"
    >
      <p className="text-[0.7rem] uppercase tracking-[0.25em] text-slate-400 sm:text-xs">
        7-day forecast
      </p>
      <div className="mt-4 space-y-2 sm:mt-5">
        {items.map((item, index) => (
          <motion.article
            key={`${item.time}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + index * 0.04 }}
            className="flex items-center gap-2.5 rounded-3xl border border-transparent px-2 py-2.5 transition hover:border-white/8 hover:bg-white/4 sm:gap-3 sm:px-2 sm:py-3"
          >
            <div className="w-10 text-[0.7rem] text-slate-300 sm:w-14 sm:text-sm">
              {index === 0 ? 'Today' : formatForecastDay(item.time)}
            </div>
            <div className="flex flex-1 items-center gap-2.5 sm:gap-3">
              <WeatherIcon
                code={item.code}
                isDay={true}
                size={0.7}
                animate={false}
                className="text-amber-300"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-100">
                  {getWeatherLabel(item.code)}
                </p>
              </div>
            </div>
            <div className="text-[0.7rem] font-medium text-slate-200 sm:text-sm">
              {formatTemperatureCompact(item.maxTemp)}/{formatTemperatureCompact(item.minTemp)}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.aside>
  );
}
