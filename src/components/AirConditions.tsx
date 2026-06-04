import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  FiChevronRight,
  FiWind,
  FiSun,
  FiDroplet,
  FiThermometer,
} from "react-icons/fi";
import type { ReactNode } from "react";
import {
  formatPercentage,
  formatTemperatureCompact,
  formatWind,
} from "../utils/date";
import type { WeatherDashboardData, Unit } from "../types/weather";

function Metric({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/8 bg-white/4 p-3 sm:p-4">
      <div className="flex items-center gap-3 text-slate-300">
        <span className="text-sky-300">{icon}</span>
        <p className="text-xs sm:text-sm">{label}</p>
      </div>
      <p className="mt-3 text-lg font-semibold tracking-tight text-white sm:mt-4 sm:text-2xl">
        {value}
      </p>
    </div>
  );
}

export default function AirConditions({
  data,
  unit,
}: {
  data: WeatherDashboardData;
  unit: Unit;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const windDirection =
    data.current.wind_direction_10m === undefined
      ? null
      : `${Math.round(data.current.wind_direction_10m)}\u00B0`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="glass-card p-4 sm:p-5 md:p-6"
    >
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 sm:text-xs">
            Air conditions
          </p>
          <h2 className="mt-2 text-base font-semibold text-slate-50 sm:text-lg">
            Current atmosphere
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Metric
          icon={<FiThermometer />}
          label="Real feel"
          value={formatTemperatureCompact(data.current.apparent_temperature)}
        />
        <Metric
          icon={<FiWind />}
          label="Wind"
          value={formatWind(
            data.current.wind_speed_10m,
            unit === "c" ? "km/h" : "mph",
          )}
        />
        <Metric
          icon={<FiDroplet />}
          label="Chance of rain"
          value={formatPercentage(data.current.precipitation_probability)}
        />
        <Metric
          icon={<FiSun />}
          label="UV index"
          value={`${Math.round(data.current.uv_index)}`}
        />
      </div>

      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Metric
                icon={<FiDroplet />}
                label="Humidity"
                value={
                  data.current.relative_humidity_2m === undefined
                    ? "N/A"
                    : formatPercentage(data.current.relative_humidity_2m)
                }
              />
              <Metric
                icon={<FiWind />}
                label="Wind direction"
                value={windDirection ?? "N/A"}
              />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-500">
              Updated at{" "}
              {new Date(data.current.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Expand/Collapse Button */}
      <div className="flex justify-end mt-5 sm:mt-6">
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded((value) => !value)}
          className="flex items-center gap-2 rounded-full bg-sky-500 px-3 py-2 text-xs font-medium text-slate-950 transition hover:bg-sky-400 sm:px-4 sm:text-sm"
        >
          {isExpanded ? "See less" : "See more"}{" "}
          <FiChevronRight
            className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}
          />
        </motion.button>
      </div>
    </motion.section>
  );
}
