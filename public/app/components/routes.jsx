import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Login from '../components/login.jsx';
import Tweet from '../components/tweet.jsx';

const Routes = () => (
  <Router history={browserHistory}>
 		<Route path="/" component={Login} />
 		<Route path="/tweet" component={Tweet} />
	</Router>
)

export default Routes;
