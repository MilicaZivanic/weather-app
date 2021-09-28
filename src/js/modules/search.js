import { setCurrentWeather } from './current';
import { setMultiWeather } from './multi';
import { celToKel } from '../utils/utils';
import { capitalizeFirstLetter } from '../utils/utils';

let address = 'Belgrade';

const searchForm = document.querySelector('.search__form');
const searchInput = document.querySelector('.search__input');
const searchCity = document.querySelector('.search__city');
const spinnerWrapper = document.querySelector('.spinner-wrapper');
const API_KEY = '9a2d317c747b4e8091f8dabfbb0245fd';
const CORS = 'https://cors-anywhere.herokuapp.com';

export const initializeSearch = _ => {
  bindSearchEvents();
  updateWeather(address);
};

const bindSearchEvents = () => {
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchInput.classList.toggle('search__input--open');
    searchInput.focus();
    if (searchInput.value === '') return;
    address = searchInput.value;
    searchInput.value = '';
    updateWeather(address);
    render();
  });
};

const updateWeather = async query => {
  spinnerWrapper.classList.toggle('spinner-wrapper--active');
  const { lat, lon } = await getLatLon(address);
  const weatherData = await getWeatherData(lat, lon);
  spinnerWrapper.classList.toggle('spinner-wrapper--active');

  const weatherCurrent = weatherData.current;
  weatherCurrent.temp = celToKel(weatherCurrent.temp);
  weatherCurrent.temperature = weatherCurrent.temp;
  setCurrentWeather(weatherCurrent);

  const weatherMulti = weatherData.daily.map(elem => {
    elem.temp.max = celToKel(elem.temp.max);
    elem.temp.min = celToKel(elem.temp.min);
    return elem;
  });

  weatherMulti[0].temperature = weatherCurrent.temp;
  weatherMulti[0].weather[0].description = capitalizeFirstLetter(
    weatherCurrent.weather[0].description
  );
  setMultiWeather(weatherMulti);
};

const getWeatherData = async (lat, lon) => {
  const requestLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const fetchData = await fetch(requestLink);
  const parsed = await fetchData.json();
  return parsed;
};

const getLatLon = async query => {
  const requestLink = `https://api.openweathermap.org/geo/1.0/direct?q=${address}&appid=${API_KEY}`;
  const fetchData = await fetch(requestLink);
  const parsed = await fetchData.json();
  const latLon = {
    lat: parsed[0].lat,
    lon: parsed[0].lon,
  };
  return latLon;
};

const render = _ => {
  searchCity.innerHTML = address;
};
