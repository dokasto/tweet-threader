'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry: [
    path.resolve(__dirname, '..', 'app/index.jsx'),
  ],

  output: {
    path: path.resolve(__dirname, '..', 'public/build'),
    filename: 'bundle.js',
    publicPath: '/build',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      'global.Object.prototype': {},
      'global.GENTLY': false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.IgnorePlugin(new RegExp('^(fs|ipc)$')),
  ],

  module: {
    loaders: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      { test: /\.json$/, loader: 'json' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=100000' },
      { test: /.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url?limit=100000' },
    ],
  },
};
