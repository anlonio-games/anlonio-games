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
  plugins: [{ src: '~/plugins/vercel.ts', mode: 'client' }],
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: [
      'trpc-nuxt',
      'vuetify'
    ]
  },
  auth: {
    origin: process.env.ORIGIN || 'http://localhost:3000'
  },
  typescript: {
    shim: false
  }
})
