module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    '@typescript-eslint/no-extra-semi':'off',
    'no-mixed-spaces-and-tabs':'off',
    'prefer-const':'off',
    '@typescript-eslint/no-unused-vars':'off',
    '@typescript-eslint/no-var-requires':'off',
    'no-async-promise-executor':'off',
    'no-undef':'off',
    '@typescript-eslint/no-empty-function':'off',
    'vue/multi-word-component-names':'off',
    'vue/no-mutating-props':'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
