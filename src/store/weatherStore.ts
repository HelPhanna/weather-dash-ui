import { create } from "zustand";
import type { WeatherStore } from "../types/weather";

export const useWeatherStore = create<WeatherStore>((set) => ({
  city: "Phnom Penh",
  unit: "c",
  setCity: (city) => set({ city }),
  setUnit: (unit) => set({ unit }),
}));
