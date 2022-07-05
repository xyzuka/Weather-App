// Date and time and real-time
const hourEl = document.querySelector('[data-time-hour]');
const minuteEl = document.querySelector('[data-time-minutes]');
const amPmEl = document.querySelector('[data-time-am-pm]');
const dayEl = document.querySelector('[data-time-day]');
const dateEl = document.querySelector('[data-time-date]');
const monthEl = document.querySelector('[data-time-month]');

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function timeFeature() {
  const currentTime = new Date();

  let currentHour = currentTime.getHours();
  let currentMinute = currentTime.getMinutes();
  let amPm = currentHour >= 12 ? 'pm' : 'am';

  if (currentHour > 12) {
    currentHour -= 12;
  }

  hourEl.textContent = currentHour.toString();
  minuteEl.textContent = currentMinute.toString().padStart(2, '0');
  amPmEl.textContent = amPm;
}

export function dayFeature() {
  const day = new Date();

  let currentDay = days[day.getDay()];
  let currentDate = day.getDate();
  let currentMonth = months[day.getMonth()];
  // let currentYear = day.getFullYear();

  dayEl.textContent = currentDay;
  dateEl.textContent = currentDate;
  monthEl.textContent = currentMonth;
  // yearEl.textContent = currentYear;
}

export function timeAndDayUpdate() {
  timeFeature();
  dayFeature();
}
