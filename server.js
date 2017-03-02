'use strict';

/**
 * App server
 */

require('dotenv').config();

const express = require('express');
const os = require('os');
const app = express();
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV;
const host = process.env.HOST_NAME;
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


// setup webpack
require('./api/lib/webpack_setup')(app);

// authentication route
require('./api/routes/auth')(app);

// post tweet route
require('./api/routes/tweet')(app);

// setup proxy for static assets
//app.use('/build', require('proxy-middleware')(require('url').parse(`${host}:${port}/public/build`)));

app.get('/', (request, response) => {
  response.render(__dirname + '/public/index.jade');
});

app.get('/tweet', (request, response) => {
  response.render(__dirname + '/public/index.jade');
});


// start server
app.listen(port, () => {
  console.log(`Tweet-threader server running on ${host}:${port} in ${env} mode`);
});
