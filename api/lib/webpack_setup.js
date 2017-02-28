'use strict';

/**
 * Setup Webpack
 * Attach webpack server during development
 */

module.exports = (app) => {

  if (process.env.NODE_ENV !== 'production') {

    const config = require('../../public/webpack/config.dev.js');
    const compiler = require('webpack')(config);

    app.use(require('webpack-dev-middleware')(compiler, {
      historyApiFallback: true,
      hot: true,
      noInfo: true,
      publicPath: config.output.publicPath,
    }));

    app.use(require('webpack-hot-middleware')(compiler));

  }

};
