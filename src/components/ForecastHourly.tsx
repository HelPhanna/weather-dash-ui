import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';
import { formatForecastHour, formatTemperatureCompact } from '../utils/date';
import type { HourlyForecastItem } from '../types/weather';

export default function ForecastHourly({
  items,
}: {
  items: HourlyForecastItem[];
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 }}
      className="glass-card p-4 sm:p-5 md:p-6"
    >
      <div className="mb-4 flex items-center justify-between sm:mb-5">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-slate-400 sm:text-xs">
            Today&apos;s forecast
          </p>
          <h2 className="mt-2 text-base font-semibold text-slate-50 sm:text-lg">Hourly forecast</h2>
        </div>
      </div>

      <div className="scrollbar-hide flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1 sm:gap-3">
        {items.map((item, index) => (
          <motion.article
            key={`${item.time}-${index}`}
            whileHover={{ y: -4, scale: 1.01 }}
            className="min-w-[90px] snap-start rounded-3xl border border-white/8 bg-white/4 px-2.5 py-3.5 text-center backdrop-blur-sm sm:min-w-[108px] sm:px-4 sm:py-4"
          >
            <p className="text-xs font-medium text-slate-300">{formatForecastHour(item.time)}</p>
            <div className="my-3.5 flex justify-center text-amber-300 sm:my-4">
              <WeatherIcon
                code={item.code}
                isDay={item.isDay}
                size={0.82}
                animate={false}
                className="drop-shadow-[0_12px_24px_rgba(251,191,36,0.24)]"
              />
            </div>
            <p className="text-base font-semibold text-slate-50 sm:text-lg">
              {formatTemperatureCompact(item.temperature)}
            </p>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
