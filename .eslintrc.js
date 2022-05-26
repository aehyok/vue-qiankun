module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    semi: 'off', // 结尾分号设置
    'comma-dangle': 'off', // 尾随一个多余的逗号
    'vue/no-multiple-template-root': 'off',
    'vue/require-v-for-key': 'off',
    'no-console': 'off', // console。log可用
    'vue/multi-word-component-names': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/no-v-for-template-key': 'off',
    'no-eval': 'off',
    'import/prefer-default-export': 'off',
    'no-undef': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off' // i++可用
  },
  settings: {}
}
