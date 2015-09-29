import { combineReducers } from 'redux';
import weather from './weather-reducer';
import calendar from './calendar-reducer';

export default combineReducers({weather, calendar});
