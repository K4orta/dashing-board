import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import reducer from '../reducers';

let createStoreWithMiddleware;
if (process.env.NODE_ENV === 'production') {
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )(createStore);
}

export default (initialState) => {
  const store = createStoreWithMiddleware(reducer, initialState);
  return store;
};
