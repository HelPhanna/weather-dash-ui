import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import CurrentWeather from '../components/CurrentWeather';
import ForecastHourly from '../components/ForecastHourly';
import ForecastWeekly from '../components/ForecastWeekly';
import AirConditions from '../components/AirConditions';
import { DashboardSkeleton } from '../components/LoadingSkeleton';
import { useWeatherDashboard } from '../hooks/useWeatherDashboard';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function HomePage() {
  const {
    city,
    unit,
    setUnit,
    handleCityChange,
    handleSelectSuggestion,
    handleSearchFocus,
    isSuggestionOpen,
    suggestions,
    isSearching,
    isWeatherLoading,
    isWeatherError,
    dashboardData,
  } = useWeatherDashboard();

  const isLoading = isSearching || isWeatherLoading;

  if (isLoading && !dashboardData) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400 sm:text-xs">
            Weather dashboard
          </p>
          <h1 className="max-w-lg text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            Live conditions with a glassmorphism finish
          </h1>
        </div>

        <div className="grid w-full max-w-full grid-cols-2 gap-1 self-start rounded-2xl border border-white/8 bg-white/5 p-1.5 backdrop-blur-md sm:flex sm:w-auto sm:max-w-none sm:items-center sm:gap-2 sm:rounded-full">
          <button
            type="button"
            onClick={() => setUnit('c')}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition sm:rounded-full sm:px-4 sm:py-2 ${
              unit === 'c' ? 'bg-sky-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            <FiSun /> {'\u00B0'}C
          </button>
          <button
            type="button"
            onClick={() => setUnit('f')}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition sm:rounded-full sm:px-4 sm:py-2 ${
              unit === 'f' ? 'bg-sky-500 text-slate-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            <FiMoon /> {'\u00B0'}F
          </button>
        </div>
      </header>

      <section className="relative">
        <SearchBar
          value={city}
          onChange={handleCityChange}
          onFocus={handleSearchFocus}
          isOpen={isSuggestionOpen}
          suggestions={suggestions.map((location) => ({
            name: location.name,
            country: location.country,
            region: location.admin1,
            latitude: location.latitude,
            longitude: location.longitude,
            timezone: location.timezone,
          }))}
          isLoading={isSearching}
          onSelectSuggestion={(location) => handleSelectSuggestion(location)}
        />
      </section>

      {isWeatherError && !dashboardData ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 text-slate-200"
        >
          We couldn&apos;t load weather data for this city. Try a different search term.
        </motion.div>
      ) : null}

      {dashboardData ? (
        <div className="grid gap-4 md:grid-cols-[minmax(0,65fr)_minmax(300px,35fr)] md:gap-5 lg:grid-cols-[minmax(0,70fr)_minmax(300px,30fr)]">
          <div className="space-y-5">
            <CurrentWeather data={dashboardData} />
            <ForecastHourly items={dashboardData.hourly} />
            <AirConditions data={dashboardData} unit={unit} />
          </div>
          <ForecastWeekly items={dashboardData.daily} />
        </div>
      ) : null}
    </div>
  );
}
