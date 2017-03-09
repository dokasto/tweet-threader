'use strict';

/**
 * Handle tweeting
 */

module.exports = (app) => {

  /**
   * Post a tweet
   */
  app.post('/status/update', (req, res) => {

    const Twitter = require('twitter');

    console.log(app.get('access_token_key'));
    console.log(app.get('access_token_secret'));

    const client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: app.get('access_token_key'),
      access_token_secret: app.get('access_token_secret')
    });


    let params = { status: req.body.status };

    if (req.body.inReply && req.body.inReply !== null) {
      params.in_reply_to_status_id = req.body.inReply;
    }

    client.post('statuses/update', params,
      (error, tweet, response) => {
        res.json({
          hasError: error ? true : false,
          error,
          tweetId: tweet.id_str
        });
      });

  });


};
