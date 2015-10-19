'use strict';

var webpack = require('webpack');
var path = require('path');

var buildPath = path.resolve(__dirname, 'dist');

module.exports = {
	devtool: 'source-map',
	devServer: {
		contentBase: 'public'
	},
	entry: [
		'./src/main'
	],
	output: {
		path: __dirname + '/public/',
		filename: 'dist/main.js',
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
		}),
	],
	resolve: {
		extensions: ['', '.js', '.scss']
	},
	module: {
		loaders: [
			{
        test: /\.json$/,
        loader: 'json'
      },
			{
				test: /\.jsx?$/,
				loaders: ['react-hot', 'babel?stage=0&optional[]=runtime&cacheDirectory'],
				exclude: /node_modules/
			},
			{
        test: /\.scss$/,
        loader: 'style!css!sass'
			},
			{
				test: /\.css/, loader: "style!css"
			}
		]
	}
};
