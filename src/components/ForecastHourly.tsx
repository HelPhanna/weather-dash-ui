import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import WeatherIcon from "./WeatherIcon";
import { formatForecastHour, formatTemperatureCompact } from "../utils/date";
import type { HourlyForecastItem } from "../types/weather";

export default function ForecastHourly({
  items,
}: {
  items: HourlyForecastItem[];
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollState();
  }, [items]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = Math.max(el.clientWidth * 0.8, 280);
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 }}
      className="glass-card p-4 sm:p-5 md:p-6"
    >
      <div className="mb-5 flex flex-col gap-1 sm:mb-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 sm:text-xs">
          Today&apos;s forecast
        </p>
        <h2 className="mt-2 text-base font-semibold text-slate-50 sm:text-lg">
          Hourly forecast
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1 sm:gap-3"
      >
        {items.map((item, index) => (
          <motion.article
            key={`${item.time}-${index}`}
            whileHover={{ y: -4, scale: 1.01 }}
            className="min-w-[90px] snap-start rounded-3xl border border-white/8 bg-white/4 px-2 py-3 text-center backdrop-blur-sm sm:min-w-[108px] sm:px-4 sm:py-4"
          >
            <p className="text-xs font-medium text-slate-300">
              {formatForecastHour(item.time)}
            </p>
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

      {/* Scroll buttons */}
      <div className="flex items-center justify-end gap-2 mt-3 sm:mt-5">
        <button
          type="button"
          onClick={() => scrollByAmount("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll hourly forecast left"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition
             hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
        >
          <FiChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount("right")}
          disabled={!canScrollRight}
          aria-label="Scroll hourly forecast right"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition
             hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
        >
          <FiChevronRight />
        </button>
      </div>
    </motion.section>
  );
}
