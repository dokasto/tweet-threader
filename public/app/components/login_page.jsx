'use strict';

import React from 'react';

class LoginPage extends React.Component {

  render() {
    return (
      <div className="login-page">
		  	<main>
					<h1>Threader</h1>
					<p>A better way to create threads on Twitter.</p>
		    	<a href="/auth/twitter" className="button">Login to start</a>
		  	</main>
		  </div>
    );
  }
}

export default LoginPage;
