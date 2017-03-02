'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PATHS = require('./constants');

module.exports = {

  devtool: 'inline-cheap-source-map',

  entry: {
    app: [
      PATHS.app
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
    publicPath: '/build',
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      'global.Object.prototype': {},
      'global.GENTLY': false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(new RegExp('^(fs|ipc)$')),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    })
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
