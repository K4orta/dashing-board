import { combineReducers } from 'redux';
import weather from './weather-reducer';
import calendar from './calendar-reducer';
import transit from './transit-reducer';

export default combineReducers({weather, calendar, transit});
