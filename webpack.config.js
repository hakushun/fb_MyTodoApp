const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
	entry: src + '/client/index.tsx',
	// devtool: "source-map",
	output: {
		path: dist,
		filename: 'main.js',
	},
	devServer: {
		contentBase: dist,
		historyApiFallback: true,
		inline: true,
		open: true,
		host: 'localhost',
		port: 8080,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				secure: false,
				logLevel: 'debug',
				changeOrigin: true,
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
				exclude: /node_modules/,
			},
			{
				test: /\.css/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { url: false },
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: src + '/client/index.html',
			filename: 'index.html',
		}),
		new Dotenv({ systemvars: true }),
		new CopyPlugin({
			patterns: [{ from: src + '/PWA' }, { from: src + '/client/assets' }],
		}),
	],
};
