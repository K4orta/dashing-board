import { combineReducers } from 'redux';
import weather from './weather-reducer';
import calendar from './calendar-reducer';
import transit from './transit-reducer';
import time from './time-reducer';
import lunch from './lunch-reducer';

export default combineReducers({weather, calendar, transit, time, lunch});
