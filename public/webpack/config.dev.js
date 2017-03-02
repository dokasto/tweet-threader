'use strict';

const webpack = require('webpack');
const PATHS = require('./constants');

module.exports = {

  devtool: 'inline-cheap-source-map',

  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      PATHS.app,
    ],
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-router',
      'react-redux'
    ]
  },

  output: {
    path: PATHS.build,
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/build'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /(node_modules|server)/, loaders: ['babel'] },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, exclude: /node_modules/, loaders: ['style', 'css'] },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=100000' },
      { test: /.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url?limit=100000' }
    ],
  }
};
