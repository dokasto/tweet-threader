import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import LoginPage from '../components/login_page.jsx';
import TweetPage from '../components/tweet_page.jsx';

const Routes = () => (
  <Router history={browserHistory}>
 		<Route path="/" component={LoginPage} />
 		<Route path="/tweet" component={TweetPage} />
	</Router>
)

export default Routes;
