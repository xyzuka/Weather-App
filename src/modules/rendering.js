const backgroundEl = document.querySelector('.background');
const userLocationEl = document.querySelector('[data-location]');
const mainTempEl = document.querySelector('[data-main-temp]');
const weatherDesEl = document.querySelector('[data-weather-description]');
const humidityEl = document.querySelector('[data-humidity-percentage]');
const feelsLikeTempEl = document.querySelector('[data-feels-like-temp]');
const switchTempBtn = document.querySelector('[data-switch-CF-button]');
const hourlyForecastContainer = document.querySelector(
  '[data-hourly-forecast-container]'
);
const dailyForecastContainer = document.querySelector(
  '[data-daily-forecast-container]'
);
const searchBarEl = document.querySelector('.search-bar');

import {
  celciusMode,
  swapTemp,
  hourlyForecastStorage,
  dailyForecastStorage,
} from './storage.js';
import Default from '../images/bgimgday/Default.jpg';

// Day time background images
import Thunderstorm from '../images/bgimgday/Thunder.jpg';
import Rain from '../images/bgimgday/Raining.jpg';
import Snow from '../images/bgimgday/Snowy.jpg';
import Atmosphere from '../images/bgimgday/Foggy.jpg';
import Clear from '../images/bgimgday/ClearSkies.jpg';
import Clouds from '../images/bgimgday/Cloudy.jpg';

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

export function renderHourlyForecast(tempNow, weatherAPIResponse) {
  if (celciusMode) {
    // Clear out parent element before populating
    hourlyForecastContainer.innerHTML = '';

    const currentWeatherIconID = weatherAPIResponse.hourly[0].weather[0].icon;

    // Render current forecast (Now)
    const currentForecastMarkup = `
    <div class="forecast-item">
      <p class="forecast-item-element">Now</p>
      <img class="forecast-icon" src="http://openweathermap.org/img/wn/${currentWeatherIconID}@2x.png" data-forecast-icon>
      <p class="forecast-item-element">${tempNow}°C</p>
    </div>
  `;
    hourlyForecastContainer.insertAdjacentHTML(
      'beforeend',
      currentForecastMarkup
    );

    // // Rendering next 12 hrs
    hourlyForecastStorage.length = 0;

    for (let i = 0; i < 13; i++) {
      hourlyForecastStorage.push(weatherAPIResponse.hourly[i]);
    }

    // Removing the first hour since it is a duplicate of "Now"
    hourlyForecastStorage.shift();

    hourlyForecastStorage.forEach((hourForecast) => {
      const dailyForecastID = hourForecast.weather[0].icon;
      const hourlyForecastIconUniqueDT = hourForecast.dt;

      const DTmilliseconds = hourlyForecastIconUniqueDT * 1000;
      const dateObj = new Date(DTmilliseconds);
      const hour = dateObj.toLocaleString('en-US', { hour: 'numeric' });

      const hourForecastMarkUp = `
      <div class="forecast-item">
        <p class="forecast-item-element">${hour}</p>
        <img class="forecast-icon" src="http://openweathermap.org/img/wn/${dailyForecastID}@2x.png" data-forecast-icon>
        <p class="forecast-item-element">${Math.round(hourForecast.temp)}°C</p>
      </div>
    `;
      hourlyForecastContainer.insertAdjacentHTML(
        'beforeend',
        hourForecastMarkUp
      );
    });
  } else {
    hourlyForecastContainer.innerHTML = '';

    const currentWeatherIconID = weatherAPIResponse.hourly[0].weather[0].icon;

    // Render current forecast (Now)
    const currentForecastMarkup = `
    <div class="forecast-item">
      <p class="forecast-item-element">Now</p>
      <img class="forecast-icon" src="http://openweathermap.org/img/wn/${currentWeatherIconID}@2x.png" data-forecast-icon>
      <p class="forecast-item-element">${tempNow}°F</p>
    </div>
  `;
    hourlyForecastContainer.insertAdjacentHTML(
      'beforeend',
      currentForecastMarkup
    );

    // // Rendering next 12 hrs
    hourlyForecastStorage.length = 0;

    for (let i = 0; i < 13; i++) {
      hourlyForecastStorage.push(weatherAPIResponse.hourly[i]);
    }

    // Removing the first hour since it is a duplicate of "Now"
    hourlyForecastStorage.shift();

    hourlyForecastStorage.forEach((hourForecast) => {
      const dailyForecastID = hourForecast.weather[0].icon;
      const hourlyForecastIconUniqueDT = hourForecast.dt;

      const DTmilliseconds = hourlyForecastIconUniqueDT * 1000;
      const dateObj = new Date(DTmilliseconds);
      const hour = dateObj.toLocaleString('en-US', { hour: 'numeric' });

      const hourForecastMarkUp = `
      <div class="forecast-item">
        <p class="forecast-item-element">${hour}</p>
        <img class="forecast-icon" src="http://openweathermap.org/img/wn/${dailyForecastID}@2x.png" data-forecast-icon>
        <p class="forecast-item-element">${Math.round(hourForecast.temp)}°F</p>
      </div>
    `;
      hourlyForecastContainer.insertAdjacentHTML(
        'beforeend',
        hourForecastMarkUp
      );
    });
  }
}

export function renderDailyForecast(weatherData) {
  if (celciusMode) {
    dailyForecastContainer.innerHTML = '';

    const todayIcon = weatherData.daily[0].weather[0].icon;
    const todayLTemp = Math.round(weatherData.daily[0].temp.min);
    const todayHTemp = Math.round(weatherData.daily[0].temp.max);

    // Render today's forecast
    const todayForecastMarkup = `
    <div class="daily-forecast-content">
      <div class="daily-forecast-day">
        <p>Today</p>
      </div>
      <div class="forecast-weather-icon-temp-container">
        <img class="forecast-icon" src="http://openweathermap.org/img/wn/${todayIcon}@2x.png" data-forecast-icon>
        <p class="daily-forecast-temp">L: ${todayLTemp}</p>
        <p class="daily-forecast-temp">H: ${todayHTemp}</p>
      </div>
    </div>
  `;
    dailyForecastContainer.insertAdjacentHTML('beforeend', todayForecastMarkup);

    // Render remaining days
    dailyForecastStorage.length = 0;

    for (let i = 0; i < 7; i++) {
      dailyForecastStorage.push(weatherData.daily[i]);
    }

    // Removing the first day since it is a duplicate of "Today"
    dailyForecastStorage.shift();

    dailyForecastStorage.forEach((dailyForecast) => {
      const dailyForecastIconID = dailyForecast.weather[0].icon;
      const dailyForecastIconUniqueDT = dailyForecast.dt;
      const todayLTemp = Math.round(dailyForecast.temp.min);
      const todayHTemp = Math.round(dailyForecast.temp.max);

      const DTmilliseconds = dailyForecastIconUniqueDT * 1000;
      const dateObj = new Date(DTmilliseconds);
      const day = dateObj.toLocaleString('en-US', { weekday: 'long' });

      const dayForecastMarkUp = `
     <div class="daily-forecast-content">
      <div class="daily-forecast-day">
        <p>${day}</p>
      </div>
      <div class="forecast-weather-icon-temp-container">
        <img class="forecast-icon" src="http://openweathermap.org/img/wn/${dailyForecastIconID}@2x.png" data-forecast-icon>
        <p class="daily-forecast-temp">L: ${todayLTemp}</p>
        <p class="daily-forecast-temp">H: ${todayHTemp}</p>
      </div>
    </div>
    `;
      dailyForecastContainer.insertAdjacentHTML('beforeend', dayForecastMarkUp);
    });
  } else {
    dailyForecastContainer.innerHTML = '';

    const todayIcon = weatherData.daily[0].weather[0].icon;
    const todayLTemp = Math.round(weatherData.daily[0].temp.min);
    const todayHTemp = Math.round(weatherData.daily[0].temp.max);

    // Render today's forecast
    const todayForecastMarkup = `
    <div class="daily-forecast-content">
      <div class="daily-forecast-day">
        <p>Today</p>
      </div>
      <div class="forecast-weather-icon-temp-container">
        <img class="forecast-icon" src="http://openweathermap.org/img/wn/${todayIcon}@2x.png" data-forecast-icon>
        <p class="daily-forecast-temp">L: ${todayLTemp}</p>
        <p class="daily-forecast-temp">H: ${todayHTemp}</p>
      </div>
    </div>
  `;
    dailyForecastContainer.insertAdjacentHTML('beforeend', todayForecastMarkup);

    // Render remaining days
    dailyForecastStorage.length = 0;

    for (let i = 0; i < 7; i++) {
      dailyForecastStorage.push(weatherData.daily[i]);
    }

    // Removing the first day since it is a duplicate of "Today"
    dailyForecastStorage.shift();

    dailyForecastStorage.forEach((dailyForecast) => {
      const dailyForecastIconID = dailyForecast.weather[0].icon;
      const dailyForecastIconUniqueDT = dailyForecast.dt;
      const todayLTemp = Math.round(dailyForecast.temp.min);
      const todayHTemp = Math.round(dailyForecast.temp.max);

      const DTmilliseconds = dailyForecastIconUniqueDT * 1000;
      const dateObj = new Date(DTmilliseconds);
      const day = dateObj.toLocaleString('en-US', { weekday: 'long' });

      const dayForecastMarkUp = `
     <div class="daily-forecast-content">
      <div class="daily-forecast-day">
        <p>${day}</p>
      </div>
      <div class="forecast-weather-icon-temp-container">
        <img class="forecast-icon" src="http://openweathermap.org/img/wn/${dailyForecastIconID}@2x.png" data-forecast-icon>
        <p class="daily-forecast-temp">L: ${todayLTemp}</p>
        <p class="daily-forecast-temp">H: ${todayHTemp}</p>
      </div>
    </div>
    `;
      dailyForecastContainer.insertAdjacentHTML('beforeend', dayForecastMarkUp);
    });
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

  searchBarEl.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('location data submitted!');
  });
}

export function renderInformation() {
  // renderUserLocation();
}
