

const webpack = require('webpack');
const path = require('path');
const PATHS = require('./constants');
const autoprefixer = require('autoprefixer');

module.exports = {
	devtool: 'inline-cheap-source-map',

	entry: {
		app: ['react-hot-loader/patch', 'webpack-hot-middleware/client', PATHS.app],
		vendor: [
			'react',
			'react-dom',
			'redux',
			'react-router',
			'react-redux',
			'buffer',
			'co',
			'redux-devtools',
			'redux-devtools-dock-monitor',
			'redux-devtools-log-monitor',
			'redux-thunk',
		],
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
				NODE_ENV: '"development"',
			},
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
	],

	postcss() {
		return [
			autoprefixer({
				browsers: ['last 3 versions'],
			}),
		];
	},

	module: {
		loaders: [
			{ test: /\.jsx?$/, exclude: /(node_modules|api)/, loaders: ['babel-loader'] },
			{ test: /\.json$/, loader: 'json' },
			{ test: /\.css$/, exclude: /node_modules/, loaders: ['style', 'css'] },
			{ test: /\.scss$/, loader: 'style!css!postcss!sass' },
			{ test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=100000' },
			{ test: /.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url?limit=100000' },
		],
	},
};
