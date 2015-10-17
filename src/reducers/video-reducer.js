import { CHANGE_VIDEO, RECEIVE_VIDEO } from '../actions/video-actions';
import randomVideo from '../utils/random-live-video';

export default (state = {
  videoId: ''
}, action) => {
  switch (action.type) {
    case CHANGE_VIDEO:
      return {
        videoId: action.videoId
      };
    case RECEIVE_VIDEO:
      let videoId = action.videoId;
      if (videoId === '') {
        videoId = randomVideo();
      }
      return {
        videoId: videoId
      }
    default:
      return state;
  }
};
