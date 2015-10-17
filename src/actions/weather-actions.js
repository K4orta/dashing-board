import fetch from 'isomorphic-fetch';

export const REQUEST_WEATHER = 'REQUEST_WEATHER';
function requrestWeather() {
  return {
    type: REQUEST_WEATHER
  }
};

export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
function receiveWeather(json) {
  return {
    type: RECEIVE_WEATHER,
    current: json.currently,
    daily: json.daily.data
  }
}

export function fetchWeather() {
  return dispatch => {
    dispatch(requrestWeather());
    return fetch(`/weather`)
      .then(resp => resp.json())
      .then(json => {
        dispatch(receiveWeather(json));
      });
  };
};
