// https://nuxt.com/docs/api/configuration/nuxt-config
// devtools: { enabled: true },
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/ionic", "@nuxtjs/tailwindcss"],
  ssr: false,
  css: ["~/assets/css/tailwindcss.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
