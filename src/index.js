import _ from 'lodash';
import './style.css';
import { renderBackground } from './modules/rendering';

function initWeatherApp() {
  renderBackground();
}

document.addEventListener('DOMContentLoaded', initWeatherApp);
