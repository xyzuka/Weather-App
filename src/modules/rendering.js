const backgroundEl = document.querySelector('.background');
const userLocationEl = document.querySelector('[data-location]');
const mainTempEl = document.querySelector('[data-main-temp]');
const weatherDesEl = document.querySelector('[data-weather-description]');
const humidityEl = document.querySelector('[data-humidity-percentage]');
const feelsLikeTempEl = document.querySelector('[data-feels-like-temp]');
const switchTempBtn = document.querySelector('[data-switch-CF-button]');

import { celciusMode, swapTemp } from './storage.js';

import Thunderstorm from '../images/bgimg/Thunder.jpg';
import Rain from '../images/bgimg/Raining.jpg';
import Snow from '../images/bgimg/Snowy.jpg';
import Atmosphere from '../images/bgimg/Foggy.jpg';
import Clear from '../images/bgimg/ClearSkies.jpg';
import Clouds from '../images/bgimg/Cloudy.jpg';

import Default from '../images/bgimg/Default.jpg';

export function renderBackground(description) {
  if (description === undefined)
    backgroundEl.style.backgroundImage = `url('${Default}')`;

  if (description === 'Thunderstorm')
    backgroundEl.style.backgroundImage = `url('${Thunderstorm}')`;

  if (description === 'Drizzle' || description === 'Rain')
    backgroundEl.style.backgroundImage = `url('${Rain}')`;

  if (description === 'Snow')
    backgroundEl.style.backgroundImage = `url('${Snow}')`;

  if (description === 'Atmosphere')
    backgroundEl.style.backgroundImage = `url('${Atmosphere}')`;

  if (description === 'Clear')
    backgroundEl.style.backgroundImage = `url('${Clear}')`;

  if (description === 'Clouds')
    backgroundEl.style.backgroundImage = `url('${Clouds}')`;
}

export function renderUserLocation(city, country) {
  userLocationEl.textContent = `${city}, ${country}`;
}

export function renderMainTemp(temp) {
  if (celciusMode) {
    mainTempEl.textContent = `${temp}°C`;
  } else {
    mainTempEl.textContent = `${temp}°F`;
  }
}

export function renderMiscInfo(weatherDes, humidity, deg) {
  if (celciusMode) {
    weatherDesEl.textContent = weatherDes;
    humidityEl.textContent = `Humidity: ${humidity}%`;
    feelsLikeTempEl.textContent = `Feels like: ${deg}°C`;
  } else {
    weatherDesEl.textContent = weatherDes;
    humidityEl.textContent = `Humidity: ${humidity}%`;
    feelsLikeTempEl.textContent = `Feels like: ${deg}°F`;
  }
}

export function appEventListeners() {
  switchTempBtn.addEventListener('click', () => {
    if (celciusMode) {
      switchTempBtn.textContent = 'Switch to °C';
      swapTemp();
    } else {
      switchTempBtn.textContent = 'Switch to °F';
      swapTemp();
    }
  });
}

export function renderInformation() {
  // renderUserLocation();
}
