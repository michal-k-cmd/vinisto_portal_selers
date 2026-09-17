module.exports = {
	plugins: ['stylelint-prettier'],
	extends: ['stylelint-config-standard'],
	rules: {
		'prettier/prettier': 'warn',
		// list of rules: https://stylelint.io/user-guide/rules/list
		// 'font-family-name-quotes': null,
		// 'color-function-notation': null,
		// 'alpha-value-notation': 'number',
		// 'length-zero-no-unit': null,
		// 'hue-degree-notation': null,
		// 'selector-class-pattern': null,
		// 'order/properties-alphabetical-order': null,
		// 'max-nesting-depth': null,
		// 'selector-max-id': null,
		// 'number-leading-zero': 'never',      // won't work because of prettier forced rules
	},
};
