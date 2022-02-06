const cssnano = require('cssnano');

const PRODUCTION = process.argv.includes('production');
const plugins = [
	require('postcss-import'),
	require('tailwindcss'),
	require('tailwindcss/nesting'),
	require('autoprefixer'),
];

if (PRODUCTION) {
	plugins.push(cssnano({
		preset: ['default', {
			discardComments: {
				removeAll: true,
			},
		}],
	}));
	plugins.push(require('postcss-100vh-fix'));
}

module.exports = { plugins };
