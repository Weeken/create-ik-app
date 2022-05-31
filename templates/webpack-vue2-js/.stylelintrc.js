module.exports = {
	extends: [
		'stylelint-config-standard-scss',
		'stylelint-config-recommended-vue',
		'stylelint-config-standard',
		'stylelint-config-prettier',
		'stylelint-prettier/recommended',
		'stylelint-config-recess-order',
		'stylelint-config-recommended-vue/scss'
	],
	plugins: ['stylelint-prettier'],
	// rule覆盖（根据自己喜好来配置）
	rules: {
		'prettier/prettier': true,
		//要求或禁止在声明块中使用尾随分号
		'declaration-block-trailing-semicolon': null,
		'declaration-block-no-duplicate-properties': true,
		'selector-class-pattern': null,
		'scss/dollar-variable-pattern': null,
		'scss/at-import-partial-extension': 'always',
		'scss/no-global-function-names': null,
		//不允许未知函数
		'function-no-unknown': null,
		'no-descending-specificity': null,
		'at-rule-no-unknown': null
	}
}
