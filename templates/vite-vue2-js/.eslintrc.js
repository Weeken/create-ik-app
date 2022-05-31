module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parser: "vue-eslint-parser",
	extends: [
		"plugin:vue/vue3-essential",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended"
	],
	parserOptions: {
		parser: "@babel/eslint-parser"
	},
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto","usePrettierrc": false }],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off",
    "space-before-function-paren": 0,
    "prefer-rest-params": "off", // 允许方法中使用 arguments参数
    "vue/multi-word-component-names": "off", // 关闭vue页面中 name的 multi-word 警告
    "vue/no-multiple-template-root": 'off',
		"vue/no-deprecated-router-link-tag-prop": 'off',
		//处理vue插槽警告Expected '#title' instead of 'v-slot:title'
		"vue/v-slot-style": "off"
  },
	overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
}
