// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Anlonio Games',
      meta: [
        { name: 'charset', content: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'A nova era das lives de TFT' }
      ]
    }
  },
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
