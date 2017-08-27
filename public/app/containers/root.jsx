import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import DevTools from './devtools.jsx';
import Routes from '../components/routes.jsx';

// styles
import '../../scss/main.scss';

const isProduction = process.env.NODE_ENV === 'production';

const Root = ({ store }) =>
	<Provider store={store}>
		{isProduction
			? <Routes />
			: <div>
				<Routes />
				<DevTools />
			</div>}
	</Provider>;

Root.PropTypes = {
	store: PropTypes.object.isRequired,
};

export default Root;
