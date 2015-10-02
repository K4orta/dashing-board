import {
  RECEIVE_MUNI,
  RECEIVE_BART
} from '../actions/transit-actions';
import trimMuni from '../utils/trim-muni-name';

export default (state = {
  muni: [],
  bart: []
}, action) => {
  switch(action.type) {
    case RECEIVE_MUNI:
      action.muni.forEach((dir) => {
        dir.routes.forEach((route) => {
          route.name = trimMuni(route.name);
        });
      });
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
