import { MINUTE_TICK } from '../actions/time-actions';
export default (state={
  time: new Date()
}, action) => {
  switch (action.type) {
    case MINUTE_TICK:
      return Object.assign({}, {time: action.time});
    default:
      return state;
  }
};
