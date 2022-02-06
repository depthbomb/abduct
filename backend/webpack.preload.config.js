/* eslint-disable  @typescript-eslint/no-var-requires */
const { resolve } = require('node:path');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	target: 'electron16-preload',
	entry: './src/preload.ts',
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'preload.js',
	},
	optimization: {
		removeAvailableModules: true,
		sideEffects: false,
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: 4,
				terserOptions: {
					format: {
						comments: false,
					},
				},
				extractComments: false,
			})
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
		plugins: [
			new TsconfigPathsPlugin()
		]
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: 'ts-loader' }
		]
	}
};
