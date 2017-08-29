const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

/**
 * Authenticate using Twitter account
 */

module.exports = app => {
	const Config = process.env;
	const Host = Config.NODE_ENV === 'development' ? `${Config.HOST_NAME}:${Config.DEV_PORT}` : Config.HOST_NAME;

	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(
		new TwitterStrategy(
			{
				consumerKey: Config.TWITTER_CONSUMER_KEY,
				consumerSecret: Config.TWITTER_CONSUMER_SECRET,
				callbackURL: `${Host}/auth/twitter/callback`
			},
			(token, tokenSecret, profile, cb) => {
				app.set('access_token_key', token);
				app.set('access_token_secret', tokenSecret);
				cb(null, { token, tokenSecret, profile });
			}
		)
	);

	passport.serializeUser((user, cb) => {
		cb(null, user);
	});

	passport.deserializeUser((obj, cb) => {
		cb(null, obj);
	});

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
		const { token, tokenSecret, profile } = req.user;

		const cookieOptions = {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 1,
			encode: String,
			secure: false,
			signed: false
		};

		res.cookie(
			'_userdata',
			JSON.stringify({ photos: profile.photos, displayName: profile.displayName, username: profile.username }),
			Object.assign({}, cookieOptions, { httpOnly: false })
		);

		res.cookie('auth', JSON.stringify({ token, tokenSecret }), cookieOptions);

		res.redirect('/tweet');
	});
};
