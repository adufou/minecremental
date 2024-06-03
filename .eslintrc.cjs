/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    // Place this last ! "plugin:prettier/recommended"
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'tailwind.config.js'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['import', 'filename-rules'],
  rules: {
    "curly": "error",
    'import/order': [
      'error',
      {
        groups: ['builtin', 'unknown', 'external'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'vue/multi-word-component-names': 'off',
  },
  overrides: [
    {
      files: ['src/shared/ui/**/*'],
      rules: {
        'filename-rules/match': ['error', {'.ts': /^index/, ".vue": /^Ui/}],
        '@typescript-eslint/no-unused-vars': 'off',
      }
    }
  ]
}
