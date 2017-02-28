'use strict';

import React from 'react';

class LoginPage extends React.Component {

	render() {
		return (
		  <div className="login-page">
		  	<section>
					<h1 className="logo">Tweet-threader</h1>
					<p>Easily create threads on Twitter.</p>
		    	<a href="/auth/twitter" className="button">Login with Twitter</a>
		  	</section>
		  </div>
		);
	}
}

export default LoginPage;
