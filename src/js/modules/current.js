import { getAnimatedIcon } from '../utils/utils';
import { capitalizeFirstLetter } from '../utils/utils';
import { toCelFah } from '../utils/utils';

let currentWeather;
let unit = 'si';

const currentIcon = document.querySelector('.current__icon');
const currentSummary = document.querySelector('.current__summary');
const tempNum = document.querySelector('.current__temp-num');
const windSpeed = document.querySelector('.current__wind span');
const humidity = document.querySelector('.current__humidity span');
const precipitation = document.querySelector('.current__precipitation span');

export const setCurrentWeather = newWeather => {
  currentWeather = newWeather;
  render();
};

export const setCurrentUnit = newUnit => {
  unit = newUnit;
  render();
};

const whichTemp = weather => {
  if (weather.temperature) {
    return weather.temperature;
  }
  return Math.round((weather.temp.max + weather.temp.min) / 2);
};

const render = _ => {
  currentIcon.innerHTML = getAnimatedIcon(currentWeather.weather[0].main);
  currentSummary.textContent = capitalizeFirstLetter(
    currentWeather.weather[0].description
  );
  windSpeed.textContent = currentWeather.wind_speed;
  humidity.textContent = currentWeather.humidity;
  precipitation.textContent = currentWeather.clouds;
  tempNum.innerHTML = `${toCelFah(whichTemp(currentWeather), unit)}&#176`;
};
