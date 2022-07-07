import _ from 'lodash';
import './style.css';
import {
  renderBackground,
  renderInformation,
  appEventListeners,
} from './modules/rendering';
import { getLocation } from './modules/appLogic.js';
import { timeAndDayUpdate } from './modules/timeFeature.js';

function initWeatherApp() {
  // setInterval(getLocation, 1000);
  setInterval(timeAndDayUpdate, 1000);
  getLocation();
  renderBackground();
  appEventListeners();
  // renderInformation();
}

document.addEventListener('DOMContentLoaded', initWeatherApp);
