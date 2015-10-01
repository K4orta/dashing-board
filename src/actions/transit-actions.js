import fetch from 'isomorphic-fetch';

export const REQUEST_MUNI = 'REQUEST_MUNI';
function requestMuni() {
  return {
    type: REQUEST_MUNI
  }
};

export const REQUEST_BART = 'REQUEST_BART';
function requestBart() {
  return {
    type: REQUEST_BART
  }
};

export const RECEIVE_MUNI = 'RECEIVE_MUNI';
function receiveMuni(json) {
  return {
    type: RECEIVE_MUNI,
    muni: json
  }
}

export const RECEIVE_BART = 'RECEIVE_BART';
function receiveBart(json) {
  return {
    type: RECEIVE_BART,
    bart: json
  }
}

export function fetchMuni() {
  return dispatch => {
    dispatch(requestMuni());
    return fetch(`http://localhost:3000/transit/muni`)
      .then(resp => resp.json())
      .then(json => {
        dispatch(receiveMuni(json));
      });
  };
};

export function fetchBart() {
  return dispatch => {
    dispatch(requestBart());
    return fetch(`http://localhost:3000/transit/bart`)
      .then(resp => resp.json())
      .then(json => {
        dispatch(receiveBart(json));
      });
  };
};
