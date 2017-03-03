'use strict';

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers';
import DevTools from '../containers/devtools.jsx';

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  DevTools.instrument(),
  persistState(getDegubSessionKey())
)(createStore);

function getDegubSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
};

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRouter = require('../reducers/index').default;
      store.replaceReducer('nextRouter');
    });

  }

  return store;
};
