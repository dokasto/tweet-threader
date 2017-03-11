'use strict';

/**
 * App server
 */

require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || process.env.DEV_PORT;

app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('compression')());

app.use(require('express-session')({
  secret: process.env.APP_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(express.static('public'));

// setup webpack
require('./api/lib/webpack_setup')(app);

// authentication route
require('./api/routes/auth')(app);

// post tweet route
require('./api/routes/tweet')(app);

app.get('/*', (request, response) => {
  response.render(__dirname + '/public/index.jade', {
    env: process.env.NODE_ENV,
    user: app.get('twitter-user')
  });
});

// start server
app.listen(port, () => {
  console.log(`Tweet-threader server running on ${process.env.HOST_NAME}:${port} in ${process.env.NODE_ENV} mode`);
});
