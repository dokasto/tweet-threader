'use strict';

/**
 * Handle tweeting
 */

module.exports = (app) => {

  const Twitter = require('twitter');

  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });


  /**
   * Post a tweet
   */
  app.post('/status/update', (req, res) => {

    let params = { status: req.body.formData.text };

    if (req.body.formData.inReply) {
      params.in_reply_to_status_id = req.body.formData.inReply;
    }

    client.post('statuses/update', params, function(error, tweet, response) {
      res.json({
        error,
        tweetId: response.id
      });
    });

  });


  app.post('/twitter/status/reply', (req, res) => {

  });

};
