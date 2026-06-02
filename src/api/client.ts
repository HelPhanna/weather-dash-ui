import axios from 'axios';
import { getEnv } from '../utils/api';

export const weatherClient = axios.create({
  baseURL: getEnv('VITE_WEATHER_BASE_URL'),
  timeout: 15000,
});

export const geocodingClient = axios.create({
  baseURL: getEnv('VITE_GEOCODING_BASE_URL'),
  timeout: 15000,
});
