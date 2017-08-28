import React from 'react';

const LoginPage = () =>
	<div className="login-page">
		<main>
			<h1>TweetThreader</h1>
			<p>This tool allows you create threads on Twitter. All you need do is compose chunk of tweets and they will be threaded.</p>
			<a href="/auth/twitter" className="button login-btn">
				Simply login with Twitter to start
			</a>
			<section>
				<ul>
					<li>- No information is stored.</li>
					<li>- No ads, no tracking.</li>
					<li>- No signup required.</li>
					<li>- No bullshit.</li>
				</ul>
				<span className="copy">
					<strong>Notes for Nerds</strong> <br />
					This project was created using NodeJS(back-end), React-Redux(frontend) and deployed via Heroku.
				</span>
			</section>
		</main>
	</div>;

export default LoginPage;
