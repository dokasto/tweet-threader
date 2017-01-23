'use strict';

import 'babel-polyfill';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';
import storage from './libs/storage';
import configureStore from './store';
import Root from './containers/root.jsx';

const APP_STORAGE = 'tweet_threader';

const store = configureStore(storage.get(APP_STORAGE) || {});

const rootElement = document.getElementById('root');

store.subscribe(() => {
  if (!storage.get('debug')) {
    storage.set(APP_STORAGE, store.getState());
  }
});

ReactDOM.render(<AppContainer><Root store={store} /></AppContainer>, rootElement);

if (module.hot) {
  module.hot.accept('./containers/root.jsx', () => {
    const NextRoot = require('./containers/root.jsx').default;
    ReactDOM.render(<AppContainer><NextRoot store={store} /></AppContainer>, rootElement);
  });
}
