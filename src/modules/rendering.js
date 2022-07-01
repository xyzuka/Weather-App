const backgroundEl = document.querySelector('[data-background-image]');
import sunnyImg from '../images/background images/Sunny.jpg';

export function renderBackground() {
  console.log('background is now rendered');

  // const myIcon = new Image();
  // myIcon.src = sunnyImg;
  // backgroundEl.appendChild(myIcon);

  backgroundEl.style.backgroundImage = sunnyImg;
}
