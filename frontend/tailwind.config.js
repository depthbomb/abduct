/* eslint-disable  @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

const PRODUCTION = process.argv.includes('production');
module.exports = {
	darkMode: 'class',
	plugins: [
		require('@tailwindcss/typography'),
		function ({ matchUtilities, theme }) {
			matchUtilities({
					highlight: value => ({ boxShadow: `inset 0 1px 0 0 ${value}` }),
				},
				{ values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
			)
		}
	],
	content: [
		'./src/**/*.{js,jsx,ts,tsx,html}',
	],
	theme: {
		extend: {
			keyframes: {},
			animation: {},
			fontFamily: {
				sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
				serif: 'kurri_island_personalblack, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
				handwritten: '"Caveat Brush", handwritten, cursive',
				flow: 'Flow',
			},
			colors: {
				rose: colors.rose,
				pink: colors.pink,
				fuchsia: colors.fuchsia,
				purple: colors.purple,
				violet: colors.violet,
				indigo: colors.indigo,
				blue: colors.blue,
				sky: colors.sky,
				cyan: colors.cyan,
				teal: colors.teal,
				emerald: colors.emerald,
				green: colors.green,
				lime: colors.lime,
				yellow: colors.yellow,
				amber: colors.amber,
				orange: colors.orange,
				red: colors.red,
				slate: colors.slate,
				gray: colors.gray,
				zinc: colors.zinc,
				neutral: colors.neutral,
				stone: colors.stone,
			},
			transitionProperty: {
				
			},
			transitionTimingFunction: {
				
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ['active', 'disabled'],
			borderColor: ['hover', 'active', 'focus', 'disabled'],
			borderWidth: ['hover', 'active', 'focus', 'disabled'],
			cursor: ['disabled'],
			opacity: ['active', 'disabled'],
			outline: ['hover', 'active', 'focus'],
			pointerEvents: ['hover', 'focus', 'disabled'],
			ringColor: ['hover', 'active', 'focus'],
			ringOffsetWidth: ['hover', 'active', 'focus'],
			textColor: ['hover', 'active', 'disabled']
		}
	},
};
