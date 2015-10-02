import {sortBy} from 'lodash';

export default (routes) => {
  return sortBy(routes, route => route.departures[0]);
}
