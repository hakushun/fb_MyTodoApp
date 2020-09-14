module.exports = {
	env: {
		browser: true,
		es6: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier/react',
		'prettier/@typescript-eslint',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	plugins: ['import', 'react', 'prettier', '@typescript-eslint'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		// Possible Errors
		// 'no-console': 'error',
		'no-unexpected-multiline': 'error',

		// Best Practices
		'class-methods-use-this': 'off',
		'consistent-return': ['error', { treatUndefinedAsUnspecified: true }],
		'dot-location': ['error', 'property'],
		'no-implicit-globals': 'error',
		'no-invalid-this': 'error',
		'no-param-reassign': ['error', { props: false }],
		'no-unmodified-loop-condition': 'error',
		'no-useless-call': 'error',
		'no-void': 'off',
		'no-else-return': 'off', // for type refinements

		'no-catch-shadow': 'error',
		'no-label-var': 'error',
		'no-shadow': [
			'error',
			{ allow: ['cb', 'next', 'req', 'res', 'err', 'error'] },
		],
		'no-undef-init': 'error',
		'no-undefined': 'error',
		'no-use-before-define': ['error', 'nofunc'],
		'no-unused-expressions': ['error', { allowShortCircuit: true }],

		// Node.js
		'callback-return': 'error',
		'no-path-concat': 'error',

		// Stylistic Issues
		// 'linebreak-style': ['error', 'unix'],
		'no-plusplus': 'off',
		quotes: ['error', 'single'],
		'comma-dangle': ['error', 'always-multiline'],

		// ES2015
		'constructor-super': 'error',
		'generator-star-spacing': ['error', 'after'],
		'no-this-before-super': 'error',
		'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
		'prefer-spread': 'error',
		'prefer-template': 'off',

		// React
		'react/no-danger': 'error',
		'react/no-deprecated': 'error',
		'react/no-did-mount-set-state': 'error',
		'react/no-did-update-set-state': 'error',
		'react/no-direct-mutation-state': 'error',
		'react/no-is-mounted': 'error',
		'react/no-set-state': 'error',
		'react/no-string-refs': 'error',
		'react/prefer-stateless-function': 'error',
		'react/prop-types': 'off',
		'react/self-closing-comp': 'off',
		'react/destructuring-assignment': 'off',

		// TypeScript
		'@typescript-eslint/no-explicit-any': 'off',

		// a11y
		'jsx-a11y/no-static-element-interactions': 'off',

		// import
		'import/no-cycle': 'error',
		'import/no-unresolved': ['off', { caseSensitive: true }],
	},
};
