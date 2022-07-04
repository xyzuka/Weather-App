import {
  renderUserLocation,
  renderMainTemp,
  renderMiscInfo,
  renderBackground,
} from './rendering.js';
import { celciusMode } from './storage.js';

function capitalize(input) {
  return input
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}

export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCoordinates);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function getCoordinates(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;

  weatherAPI(lat, long);
  geolocationAPI(lat, long);
}

function renderWeatherInformation(weatherData) {
  const mainTemp = Math.round(weatherData.current.temp);
  const mainWeatherDescription = weatherData.current.weather[0].main;
  const weatherDescription = weatherData.current.weather[0].description;
  const weatherDesReformatted = capitalize(weatherDescription);
  const humidity = weatherData.current.humidity;
  const feelsLikeTemp = Math.round(weatherData.current.feels_like);

  renderMainTemp(mainTemp);
  renderMiscInfo(weatherDesReformatted, humidity, feelsLikeTemp);
  renderBackground(mainWeatherDescription);
}

// API which searches for weather information based on lat and long
async function weatherAPI(lat, long) {
  if (celciusMode) {
    const responseCelcius = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=minutely&appid=2b309ac1935a89eccd3652ba2eecfdf2`,
      { mode: 'cors' }
    );

    const weatherData = await responseCelcius.json();

    // console.log(weatherData.current.weather[0].description);

    console.log(weatherData);

    renderWeatherInformation(weatherData);

    // const mainTemp = Math.round(weatherData.current.temp);
    // const weatherDescription = weatherData.current.weather[0].description;
    // const weatherDesReformatted = capitalize(weatherDescription);
    // const humidity = weatherData.current.humidity;
    // const feelsLikeTemp = Math.round(weatherData.current.feels_like);

    // renderMainTemp(mainTemp);
    // renderMiscInfo(weatherDesReformatted, humidity, feelsLikeTemp);
  } else {
    const responseFahrenheit = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=minutely&appid=2b309ac1935a89eccd3652ba2eecfdf2`,
      { mode: 'cors' }
    );

    const weatherData = await responseFahrenheit.json();

    renderWeatherInformation(weatherData);
  }
}

// API which searches where the user is located based on lat and long
async function geolocationAPI(lat, long) {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=9021b7c3d2c04f438d5d80b71fdb4e6e`
  );

  const locationData = await response.json();

  const locationCity = locationData.features[0].properties.city;

  const locationCountry = locationData.features[0].properties.country;

  renderUserLocation(locationCity, locationCountry);
}
