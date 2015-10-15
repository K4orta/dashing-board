import { CHANGE_VIDEO } from '../actions/video-actions';
export default (state = {}, action) => {
  switch (action.type) {
    case CHANGE_VIDEO:
      return state;
    default:
      return state;
  }
};
