import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';

export default [
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}'],
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
    },

    {
        name: 'app/files-to-ignore',
        ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
    },

    ...pluginVue.configs['flat/essential'],
    ...vueTsEslintConfig(),
    skipFormatting,
];
