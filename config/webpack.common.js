const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	stats: {
		assets: false,
		moduleAssets: false,
	},

	entry: {
		app: path.resolve(__dirname + '/../src/index.ts'),
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /(node_modules)/
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /(node_modules)/,
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				loader: 'url-loader',
				options: {
					limit: 10 * 1024 // larger than 10KB won’t be inlined
				}
			},
			{
				test: /\.svg$/,
				loader: 'svg-url-loader',
				options: {
					limit: 10 * 1024, // larger than 10KB won’t be inlined
					noquotes: true,
				}
			}
		],
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},

	plugins: [new MiniCssExtractPlugin()]
};