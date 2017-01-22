'use strict';

/**
 * App server
 */

const express = require('express');
const app = express();
const path = require('path');
const compression = require('compression');
const proxyMiddleware = require('proxy-middleware');
const url = require('url');

const env = process.env.NODE_ENV;
const port = process.env.PORT || 5000;

app.set('view engine', 'jade');

app.use(compression());

// Attach webpack server during development
if (env !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./public/webpack/dev.js');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

// setup proxy for static assets
app.use('/public', proxyMiddleware(url.parse(`http://localhost:${port}/public/build`)));

app.get('/*', (request, response) => {
  response.render(__dirname + '/public/index.jade');
});

// start server
app.listen(port, () => {
  console.log('Tweet-threader server running on ' + port);
});
