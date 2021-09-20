module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'plugin:vue/vue3-recommended',
	],
	rules: {
		'vue/v-on-style': ['error', 'shorthand'],
		'vue/v-bind-style': ['error', 'shorthand'],
		'vue/prop-name-casing': ['error', 'camelCase'],
		'vue/mustache-interpolation-spacing': ['error', 'never'],
		'vue/singleline-html-element-content-newline': 0,
		'vue/html-closing-bracket-newline': 0,
		'vue/max-attributes-per-line': 0,
		'vue/html-indent': 0,
	},
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module',
		ecmaVersion: 2018,
	},
	overrides: [
		{
			files: [
				'src/**/*.spec.{j,t}s?(x)',
			],
			env: {
				mocha: true,
			},
		},
	],
};