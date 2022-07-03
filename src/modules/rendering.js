const backgroundEl = document.querySelector('[data-background-image]');
const userLocationEl = document.querySelector('[data-location]');
const mainTempEl = document.querySelector('[data-main-temp]');
const weatherDesEl = document.querySelector('[data-weather-description]');
const humidityEl = document.querySelector('[data-humidity-percentage]');
const feelsLikeTempEl = document.querySelector('[data-feels-like-temp]');
import sunnyImg from '../images/background images/Sunny.jpg';
import { celciusMode } from './storage.js';

export function renderBackground() {
  // console.log('background is now rendered');

  // const myIcon = new Image();
  // myIcon.src = sunnyImg;
  // backgroundEl.appendChild(myIcon);

  backgroundEl.style.backgroundImage = sunnyImg;
}

export function renderUserLocation(city, country) {
  userLocationEl.textContent = `${city}, ${country}`;
}

export function renderMainTemp(temp) {
  if (celciusMode) {
    mainTempEl.textContent = `${temp}°C`;
  } else {
    console.log('render fahrenheit');
  }
}

export function renderMiscInfo(weatherDes, humidity, deg) {
  weatherDesEl.textContent = weatherDes;
  humidityEl.textContent = `Humidity: ${humidity}%`;
  feelsLikeTempEl.textContent = `Feels like: ${deg}°C`;
}

export function renderInformation() {
  // renderUserLocation();
}
