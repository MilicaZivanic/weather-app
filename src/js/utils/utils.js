import cloudy from './../../images/cloudy.png';
import rainy from './../../images/rainy.png';
import sunny from './../../images/sunny.png';
import stormy from './../../images/stormy.png';
import windy from './../../images/windy.png';

export const celToKel = temp => {
  return temp + 273.15;
};

export const kelToCelcius = temp => {
  return temp - 273.15;
};

export const kelToFahrenheit = temp => {
  return temp * (9 / 5) - 459.67;
};

export const toCelFah = (temp, unit) => {
  if (unit === 'us') {
    return Math.round(kelToFahrenheit(temp));
  }
  return Math.round(kelToCelcius(temp));
};

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getIcon = description => {
  switch (description) {
    case 'Clear':
      return sunny;

    case 'Drizzle':
    case 'Rain':
      return rainy;

    case 'Snow':
      return rainy;

    case 'Squall':
    case 'Mist':
    case 'Sand':
      return windy;

    case 'Clouds':
      return cloudy;

    case 'Thunderstorm':
    case 'Hail':
    case 'Tornado':
      return stormy;
    default:
      return sunny;
  }
};

export const getAnimatedIcon = description => {
  switch (description) {
    case 'Clear':
      return `
        <div class="icon sunny">
          <div class="sun">
            <div class="rays"></div>
          </div>
        </div>
      `;

    case 'Drizzle':
    case 'Rain':
      return `
        <div class="icon rainy">
          <div class="cloud"></div>
          <div class="rain"></div>
        </div>
      `;

    case 'Snow':
      return `
        <div class="icon flurries">
          <div class="cloud"></div>
          <div class="snow">
            <div class="flake"></div>
            <div class="flake"></div>
          </div>
        </div>
      `;

    case 'Clouds':
    case 'Squall':
    case 'Mist':
    case 'Sand':
      return `
        <div class="icon cloudy">
          <div class="cloud"></div>
          <div class="cloud"></div>
        </div>
      `;

    case 'Thunderstorm':
    case 'Hail':
    case 'Tornado':
      return `
        <div class="icon thunder-storm">
          <div class="cloud"></div>
          <div class="lightning">
            <div class="bolt"></div>
            <div class="bolt"></div>
          </div>
        </div>
      `;
    default:
      return `
        <div class="icon sunny">
          <div class="sun">
            <div class="rays"></div>
          </div>
        </div>
      `;
  }
};
