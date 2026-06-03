import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import CurrentWeather from "../components/CurrentWeather";
import ForecastHourly from "../components/ForecastHourly";
import ForecastWeekly from "../components/ForecastWeekly";
import AirConditions from "../components/AirConditions";
import { DashboardSkeleton } from "../components/LoadingSkeleton";
import { useWeatherDashboard } from "../hooks/useWeatherDashboard";
import { FiSun, FiMoon } from "react-icons/fi";
import Logo from "../assets/pp-weather-logo.png";

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
      <header className="flex w-full items-start justify-between gap-3 sm:gap-4 lg:items-end mb-8">
        <div className="space-y-2">
          <img src={Logo} alt="logo" className="w-35 sm:w-40" />
        </div>

        <div className="flex w-fit shrink-0 items-center gap-1 rounded-2xl border border-white/8 bg-white/5 p-1 backdrop-blur-md sm:gap-2 sm:rounded-full">
          <button
            type="button"
            onClick={() => setUnit("c")}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-1 py-0.5 text-sm font-medium transition sm:rounded-full sm:px-2 sm:py-1 ${
              unit === "c"
                ? "bg-sky-500 text-slate-950"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <FiSun /> {"\u00B0"}C
          </button>
          <button
            type="button"
            onClick={() => setUnit("f")}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-1 py-0.5 text-sm font-medium transition sm:rounded-full sm:px-2 sm:py-1 ${
              unit === "f"
                ? "bg-sky-500 text-slate-950"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <FiMoon /> {"\u00B0"}F
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
          We couldn&apos;t load weather data for this city. Try a different
          search term.
        </motion.div>
      ) : null}

      {dashboardData ? (
        <div
          className="grid gap-4 grid-cols-1 md:grid-cols-[minmax(0,65fr)_minmax(0,35fr)] md:gap-5 lg:grid-cols-[minmax(0,70fr)_minmax(0,30fr)] 
        w-full max-w-full overflow-hidden"
        >
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
