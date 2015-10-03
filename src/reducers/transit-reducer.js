import {
  RECEIVE_MUNI,
  RECEIVE_BART
} from '../actions/transit-actions';
import trimMuni from '../utils/trim-muni-name';
import sortRoutes from '../utils/sort-routes';

export default (state = {
  muni: [],
  bart: []
}, action) => {
  switch(action.type) {
    case RECEIVE_MUNI:
      action.muni.forEach((dir) => {
        dir.routes.forEach((route) => {
          route.name = trimMuni(route.name);
          if (dir.name === 'Outbound' && route.name === 'Third Street') {
            route.name = 'Balboa Park'
            route.code = 'K'
          }
        });
        dir.routes = sortRoutes(dir.routes);
      });
      if (action.muni[0].name === 'Inbound') {
        action.muni = action.muni.reverse();
      }

      return Object.assign({}, state, {
        muni: action.muni
      })
    case RECEIVE_BART:
      action.bart.forEach((dir) => {
        dir.routes = dir.routes.filter((route) => {
          return route.departures != null && route.departures.length > 1;
        });
        dir.routes = sortRoutes(dir.routes);
      });
      if (action.bart[0].name === 'SF Airport') {
        action.bart = action.bart.reverse();
      }
      return Object.assign({}, state, {
        bart: action.bart
      });
    default:
      return state;
  }
}
