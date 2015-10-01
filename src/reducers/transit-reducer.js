import {
  RECEIVE_MUNI,
  RECEIVE_BART
} from '../actions/transit-actions';

export default (state = {
  muni: [],
  bart: []
}, action) => {
  switch(action.type) {
    case RECEIVE_MUNI:
      return Object.assign({}, state, {
        muni: action.muni
      })
    case RECEIVE_BART:
      return Object.assign({}, state, {
        bart: action.bart
      });
    default:
      return state;
  }
}
