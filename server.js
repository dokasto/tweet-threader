'use strict';

/**
 * App server
 */

require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV;
const host = process.env.HOST_NAME;
const port = process.env.PORT || process.env.DEV_PORT;

let proxyTarget = (env === 'development') ? `${host}:${port}` : host;
proxyTarget += '/public/build';

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

// setup proxy for static assets
app.use('/build', require('http-proxy-middleware')({ target: proxyTarget, changeOrigin: false }));

app.get('/*', (request, response) => {
  response.render(__dirname + '/public/index.jade');
});

// start server
app.listen(port, () => {
  console.log(`Tweet-threader server running on ${host}:${port} in ${env} mode`);
});
