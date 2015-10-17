import fetch from 'isomorphic-fetch';

export const CHANGE_VIDEO = 'CHANGE_VIDEO';
export function changeVideo(id) {
  return {
    type: CHANGE_VIDEO,
    videoId: id
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
    videoId: json.videoId
  };
};

export function fetchVideo() {
    return dispatch => {
      dispatch(requestVideo());
      return fetch('/video')
        .then(resp => resp.json())
        .then(json => {
          dispatch(receiveVideo(json))
        }).catch(err => {

        });
    }
};
