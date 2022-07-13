import { renderMainTemp } from './rendering.js';
import { getLocation, geocodingAPI } from './appLogic.js';

export let celciusMode = true;

export let hourlyForecastStorage = [];

export let dailyForecastStorage = [];

export let forecastSearchStorage = [];

export function swapTemp() {
  if (celciusMode) {
    celciusMode = false;
  } else {
    celciusMode = true;
  }

  if (forecastSearchStorage.length === 0) {
    getLocation();
  } else {
    geocodingAPI(forecastSearchStorage[0]);
  }
}
