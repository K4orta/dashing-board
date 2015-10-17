import fetch from 'isomorphic-fetch';

export const REQUEST_TRUCKS = 'REQUEST_TRUCKS';
function requestTrucks() {
  return {
    type: REQUEST_TRUCKS
  }
};

export const RECEIVE_TRUCKS = 'RECEIVE_TRUCKS';
function receiveTrucks(json) {
  return {
    type: RECEIVE_TRUCKS,
    trucks: json
  }
}


export function fetchTrucks() {
  return dispatch => {
    dispatch(requestTrucks());
    return fetch(`/lunch/5`) // 5 is the code for the Civic Center Off the Grid
      .then(resp => resp.json())
      .then(json => {
        dispatch(receiveTrucks(json));
      }).catch((err) => {

      });
  };
};
