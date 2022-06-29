import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  runtimeConfig: {
    API_URL: 'https://eth-mainnet.alchemyapi.io/v2',
    API_KEY: 'MV_Oh2fNciRN7IZ14QhR4VRDiF9VztlY',
    public: {
      NETWORK_ID: '0x3'
    }
  },
  css: [
    '~/assets/css/tailwind.css'
  ],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
    transpile: ['@ethersproject']
  },
  vite: {
    optimizeDeps: {
      include: ['bn.js', 'js-sha3', 'hash.js', 'aes-js', 'scrypt-js', 'bech32']
    }
  },
  modules: [
    '@vueuse/nuxt'
  ]
})
