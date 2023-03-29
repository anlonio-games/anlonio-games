// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss'
  ],
  build: {
    transpile: [
      'trpc-nuxt'
    ]
  },
  auth: {
    origin: process.env.ORIGIN || 'http://localhost:3000'
  },
  typescript: {
    shim: false
  }
})
