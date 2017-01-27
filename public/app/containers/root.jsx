'use strict';

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import DevTools from './devtools.jsx';
import Routes from '../components/routes.jsx';

// SCSS styles
import '../../scss/main.scss';

let isProduction = (process.env.NODE_ENV === 'production') ? true : false;

export default class Root extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={this.props.store}>
		  	{ isProduction ? <Routes /> : <div><Routes />{/*<DevTools />*/}</div> }
		  </Provider>
    );
  }
}

Root.PropTypes = {
  store: PropTypes.object.isRequired
};
