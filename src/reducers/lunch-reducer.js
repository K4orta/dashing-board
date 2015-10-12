import {
  RECEIVE_TRUCKS
} from '../actions/lunch-actions';

export default (state = {trucks: []}, action) => {
  switch (action.type) {
    case RECEIVE_TRUCKS:
      return Object.assign({}, {trucks: action.trucks});
    default:
      return state;
  }
}
