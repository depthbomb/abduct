module.exports = {
	extends: ['stylelint-config-standard'],
	rules: {
		'indentation': null,
		'string-quotes': null,
		'font-family-name-quotes': null,
		'comment-empty-line-before': null,
		'at-rule-empty-line-before': null,
		'declaration-colon-newline-after': null,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'variants',
					'responsive',
					'screen',
				],
			},
		],
		'declaration-block-trailing-semicolon': null,
		'no-descending-specificity': null,
	},
};
