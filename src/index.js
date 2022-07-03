import _ from 'lodash';
import './style.css';
import { renderBackground, renderInformation } from './modules/rendering';
import { getLocation } from './modules/appLogic.js';

function initWeatherApp() {
  getLocation();
  renderBackground();
  // renderInformation();
}

document.addEventListener('DOMContentLoaded', initWeatherApp);
