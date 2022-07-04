import _ from 'lodash';
import './style.css';
import {
  renderBackground,
  renderInformation,
  appEventListeners,
} from './modules/rendering';
import { getLocation } from './modules/appLogic.js';

function initWeatherApp() {
  getLocation();
  renderBackground();
  appEventListeners();
  // renderInformation();
}

document.addEventListener('DOMContentLoaded', initWeatherApp);
