import './../scss/main.scss';
import { bindMultiEvents } from './modules/multi';
import { initializeSearch } from './modules/search';
import { bindUnitEvents } from './modules/units';

initializeSearch();
bindMultiEvents();
bindUnitEvents();
