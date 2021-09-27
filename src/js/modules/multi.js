import { getIcon } from '../utils/utils';
import { toCelFah } from '../utils/utils';
import { setCurrentWeather } from './current';

let weatherList = [];
let unit = 'si';
let selectedIndex = 0;

const wlist = document.querySelector('.wlist');

export const bindMultiEvents = _ => {
  wlist.addEventListener('click', event => {
    let elem = event.target;
    while (elem && !elem.matches('.wlist__item')) {
      elem = event.target.parentElement;
    }
    const listItemIndex = [...elem.parentElement.children].indexOf(elem);
    selectedIndex = listItemIndex;
    setCurrentWeather(weatherList[listItemIndex]);
    render();
  });
};

export const setMultiWeather = newList => {
  weatherList = newList;
  render();
};

export const setMultiUnit = newUnit => {
  unit = newUnit;
  render();
};

const getDayOfWeek = dayIndex => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[dayIndex];
};

const render = _ => {
  let markup = '';
  for (let i = 0; i < 5; i++) {
    const highTemp = weatherList[i].temp.max;
    const lowTemp = weatherList[i].temp.min;
    const currentDayIndex = new Date(weatherList[i].dt * 1000).getDay();
    markup += `
        <div class="wlist__item ${
          i === selectedIndex ? 'wlist__item--selected' : ''
        }">
            <img src="${getIcon(
              weatherList[i].weather[0].main
            )}" class="wlist__icon">
            <div class="wlist__range">
                ${toCelFah(highTemp, unit)}/${toCelFah(lowTemp, unit)}
            </div>
            <div class="wlist__day">
             ${getDayOfWeek(currentDayIndex)}
            </div>
        </div>
        `;
  }
  wlist.innerHTML = markup;
};
