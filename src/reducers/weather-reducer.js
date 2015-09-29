import {
  RECEIVE_WEATHER
} from '../actions/weather-actions';

export default (state = {
  current: {},
  daily: []
}, action) => {
  switch(action.type) {
    case RECEIVE_WEATHER:
      return {
        current: action.current,
        daily: action.daily.slice(0,7)
      }
    default:
      return state;
  }
}
