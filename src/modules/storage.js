import { renderMainTemp } from './rendering.js';
import { getLocation } from './appLogic.js';

export let celciusMode = true;

export function swapTemp() {
  console.log('temp is swapped');

  if (celciusMode) {
    celciusMode = false;
  } else {
    celciusMode = true;
  }

  console.log(celciusMode);
  getLocation();
}

export let hourlyForecastStorage = [];

export let dailyForecastStorage = [];
