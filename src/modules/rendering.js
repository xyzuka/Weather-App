const backgroundEl = document.querySelector('.background');
const userLocationEl = document.querySelector('[data-location]');
const mainTempEl = document.querySelector('[data-main-temp]');
const weatherDesEl = document.querySelector('[data-weather-description]');
const humidityEl = document.querySelector('[data-humidity-percentage]');
const feelsLikeTempEl = document.querySelector('[data-feels-like-temp]');
const switchTempBtn = document.querySelector('[data-switch-CF-button]');

import { celciusMode, swapTemp } from './storage.js';
import Default from '../images/bgimgday/Default.jpg';

// Day time background images
import Thunderstorm from '../images/bgimgday/Thunder.jpg';
import Rain from '../images/bgimgday/Raining.jpg';
import Snow from '../images/bgimgday/Snowy.jpg';
import Atmosphere from '../images/bgimgday/Foggy.jpg';
import Clear from '../images/bgimgday/ClearSkies.jpg';
import Clouds from '../images/bgimgday/Cloudy.jpg';

// Night time background images
import ThunderstormNight from '../images/bgimgnight/Thunder.jpg';
import RainNight from '../images/bgimgnight/Rain.jpg';
import SnowNight from '../images/bgimgnight/Snowy.jpg';
import AtmosphereNight from '../images/bgimgnight/Foggy.jpg';
import ClearNight from '../images/bgimgnight/ClearSkies.jpg';
import CloudsNight from '../images/bgimgnight/Cloudy.jpg';

// Weather icons - Day
import ThunderstormIcon from '../images/weathericons/day/thunderstorm.png';
import RainIcon from '../images/weathericons/day/rain.png';
import SnowIcon from '../images/weathericons/day/snow.png';
import AtmosphereIcon from '../images/weathericons/day/fog.png';
import ClearIcon from '../images/weathericons/day/clear-day.png';
import ClearIconNight from '../images/weathericons/night/clear-night.png';
import CloudsIcon from '../images/weathericons/day/cloudy.png';

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

function renderWeatherIcon(description) {
  const forecastIcon = document.querySelector('[data-forecast-icon]');

  if (description === 'Thunderstorm') forecastIcon.src = `${ThunderstormIcon}`;

  if (description === 'Drizzle' || description === 'Rain')
    forecastIcon.src = `${RainIcon}`;

  if (description === 'Snow') forecastIcon.src = `${SnowIcon}`;

  if (description === 'Atmosphere') forecastIcon.src = `${AtmosphereIcon}`;

  if (description === 'Clear') forecastIcon.src = `${ClearIcon}`;

  if (description === 'Clouds') forecastIcon.src = `${CloudsIcon}`;
}

export function renderHourlyForecast(
  tempNow,
  descriptionNow,
  weatherAPIResponse
) {
  // Container element
  const hourlyForecastContainer = document.querySelector(
    '[data-hourly-forecast-container]'
  );
  // Render current forecast
  const currentForecastMarkup = `
    <div class="forecast-item">
      <p class="forecast-item-element">Now</p>
      <img class="forecast-icon" src="" data-forecast-icon>
      <p class="forecast-item-element">${tempNow}°C</p>
    </div>
  `;
  hourlyForecastContainer.insertAdjacentHTML(
    'beforeend',
    currentForecastMarkup
  );

  renderWeatherIcon(descriptionNow);

  // Rendering next 12 hrs
  console.log(weatherAPIResponse.hourly);

  for (let i = 0; i < weatherAPIResponse.hourly[2]; i++) {
    console.log([i]);
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
