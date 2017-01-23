'use strict';

import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import DevTools from './devtools.jsx';
import Routes from '../components/routes.jsx';

let isProduction = (process.env.NODE_ENV === 'production') ? true : false;

const Root = ({ store }) => (
  <Provider store={store}>
  	{ isProduction ? <Routes /> : <div><Routes /><DevTools /></div> }
  </Provider>
);

Root.PropTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
