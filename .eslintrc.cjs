module.exports = {
	root: true,
	env: {
		browser: true,
		es2022: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/strict-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'prettier'
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname,
	},
	settings: {
		react: {
			version: 'detect'
		},
		'import/resolver': {
			typescript: {
				project: './tsconfig.json'
			}
		}
	},
	plugins: [
		'react',
		'react-refresh',
		'@typescript-eslint',
		'import'
	],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-unused-vars': ['error', {
			'argsIgnorePattern': '^_',
			'varsIgnorePattern': '^_',
			'destructuredArrayIgnorePattern': '^_'
		}],
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{ prefer: 'type-imports' }
		],
		'import/order': [
			'error',
			{
				'groups': [
					'builtin',
					'external',
					'internal',
					['parent', 'sibling'],
					'index',
					'object',
					'type'
				],
				'pathGroups': [
					{
						'pattern': 'react',
						'group': 'external',
						'position': 'before'
					},
					{
						'pattern': '@/**',
						'group': 'internal'
					}
				],
				'pathGroupsExcludedImportTypes': ['react'],
				'newlines-between': 'always',
				'alphabetize': {
					'order': 'asc',
					'caseInsensitive': true
				}
			}
		],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always']
	}
}