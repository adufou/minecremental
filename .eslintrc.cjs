module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        // Here is config for react recommended, see : https://github.com/microsoft/TypeScript/issues/56042
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        // Place this last ! "plugin:prettier/recommended"
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['import'],
    rules: {
        'react-hooks/exhaustive-deps': 'off',
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
    },
};
