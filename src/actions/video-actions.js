import fetch from 'isomorphic-fetch';

export const CHANGE_VIDEO = 'CHANGE_VIDEO';
export function changeVideo(id) {
  return {
    type: CHANGE_VIDEO,
    id: id
  }
};

export const REQUEST_VIDEO = 'FETCH_VIDEO';
export function requestVideo() {
  return {
    type: REQUEST_VIDEO
  };
};

export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';
export function receiveVideo(json) {
  return {
    type: RECEIVE_VIDEO,
    video: json
  };
};

export function fetchVideo() {
    return dispatch => {
      dispatch(requestVideo());
      return fetch('http://localhost:3000/video')
        .then(resp => resp.json())
        .then(json => {
          dispatch(receiveVideo(json))
        }).catch(err => {

        });
    }
};
