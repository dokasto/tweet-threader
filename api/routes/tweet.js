const Twitter = require('twitter');

/**
 * Handle tweeting
 */

module.exports = app => {
	/**
   * Post a tweet
   */
	app.post('/status/update', (req, res) => {
		if (req.cookies && req.cookies.auth) {
			const auth = JSON.parse(req.cookies.auth);
			const client = new Twitter({
				consumer_key: process.env.TWITTER_CONSUMER_KEY,
				consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
				access_token_key: auth.token,
				access_token_secret: auth.tokenSecret
			});

			const params = { status: req.body.status };

			if (req.body.inReply && req.body.inReply !== null) {
				params.in_reply_to_status_id = req.body.inReply;
			}

			client.post('statuses/update', params, (error, tweet) => {
				res.json({
					hasError: !!error,
					error,
					tweetId: tweet.id_str
				});
			});
		} else {
			res.json({ hasError: true, error: 'un-authorized' });
		}
	});
};
