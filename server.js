'use strict';

/**
 * App server
 */

require('dotenv').config();

const express = require('express');
const app = express();
const env = process.env.NODE_ENV;
const port = process.env.PORT || process.env.DEV_PORT;

app.set('view engine', 'jade');
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('compression')());

app.use(require('express-session')({
  secret: process.env.APP_SECRET,
  resave: false,
  saveUninitialized: false
}));

// setup webpack
require('./api/lib/webpack_setup')(app);

// authentication route
require('./api/routes/auth')(app);

// setup proxy for static assets
app.use('/public', require('proxy-middleware')(require('url').parse(`http://localhost:${port}/public/build`)));

app.get('/*', (request, response) => {
  response.render(__dirname + '/public/index.jade');
});

// start server
app.listen(port, () => {
  console.log(`Tweet-threader server running on http://localhost:${port} in ${env} mode`);
});
