export const CHANGE_VIDEO = 'CHANGE_VIDEO';

export const FETCH_VIDEO = 'FETCH_VIDEO';
export function requestVideo() {
  return {
    type: FETCH_VIDEO

  }
}

export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';
export function receiveVideo(json) {
  return {
    type: RECEIVE_VIDEO,
    video: json
  }
}

export function fetchVideo() {

}
