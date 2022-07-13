import _ from 'lodash';
import './style.css';
import { renderBackground, appEventListeners } from './modules/rendering';
import { getLocation } from './modules/appLogic.js';
import { timeAndDayUpdate } from './modules/timeFeature.js';

function initWeatherApp() {
  setInterval(timeAndDayUpdate, 1000);
  getLocation();
  renderBackground();
  appEventListeners();
}

document.addEventListener('DOMContentLoaded', initWeatherApp);
