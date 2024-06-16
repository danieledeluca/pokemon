/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['Message', 'Tooltip', 'Header'],
            },
        ],
    },
};
