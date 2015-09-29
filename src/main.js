import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './views/dashboard';
import { Provider } from 'react-redux';

import configStore from './store/configure-store';


const store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <Dashboard />
  </Provider>,
  document.getElementById('app')
);
