import { AnimatePresence, motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiLoader } from 'react-icons/fi';
import type { WeatherLocation } from '../types/weather';

export default function SearchBar({
  value,
  onChange,
  suggestions,
  isLoading,
  isOpen,
  onFocus,
  onSelectSuggestion,
}: {
  value: string;
  onChange: (value: string) => void;
  suggestions: WeatherLocation[];
  isLoading: boolean;
  isOpen: boolean;
  onFocus: () => void;
  onSelectSuggestion: (location: WeatherLocation) => void;
}) {
  return (
    <div className="relative w-full">
      <motion.div
        whileHover={{ boxShadow: '0 0 0 1px rgba(56,189,248,0.2), 0 0 30px rgba(56,189,248,0.08)' }}
        className="glass-card glass-glow relative flex items-center gap-3 px-4 py-3.5 sm:py-3"
      >
        <FiSearch className="text-slate-300" />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={onFocus}
          placeholder="Search for cities"
          className="min-w-0 w-full bg-transparent text-base text-slate-100 placeholder:text-slate-400 outline-none sm:text-sm"
        />
        {isLoading ? (
          <FiLoader className="animate-spin text-sky-400" />
        ) : (
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Live</span>
        )}
      </motion.div>

      <AnimatePresence>
        {isOpen && value.trim().length >= 2 ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22 }}
            className="glass-card absolute z-20 mt-3 w-full overflow-hidden"
          >
            <div className="border-b border-white/8 px-4 py-3 text-xs uppercase tracking-[0.24em] text-slate-400">
              Suggestions
            </div>
            <div className="max-h-72 overflow-y-auto">
              {suggestions.length > 0 ? (
                suggestions.map((location) => (
                  <motion.button
                    key={`${location.latitude}-${location.longitude}`}
                    type="button"
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => onSelectSuggestion(location)}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8 text-sky-300">
                      <FiMapPin />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-slate-50">
                        {location.name}
                      </span>
                      <span className="block truncate text-xs text-slate-400">
                        {[location.region, location.country].filter(Boolean).join(', ') ||
                          'Any location'}
                      </span>
                    </span>
                  </motion.button>
                ))
              ) : (
                <div className="px-4 py-6 text-sm text-slate-400">No matching cities found.</div>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
