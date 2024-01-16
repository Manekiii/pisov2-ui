// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/ionic", "@nuxtjs/tailwindcss"],
  plugins:[
    '~/plugins/global-functions.js'
  ],
  ssr: false,
  css: ["~/assets/css/tailwindcss.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
