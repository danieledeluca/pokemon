// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    pages: true,
    future: {
        compatibilityVersion: 4,
    },
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.colors.min.css',
                },
            ],
        },
    },
    css: ['~/assets/main.css'],
    modules: ['@nuxt/eslint', '@nuxt/image'],
});
