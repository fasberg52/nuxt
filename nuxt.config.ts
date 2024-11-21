// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: ['~/plugins/vue-persian-datetime-picker.client.ts'],
  runtimeConfig: {
    public: {
      apiUrl: 'http://localhost:3014/api',
    },
  },
  typescript: {
    shim: false,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/image-edge',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    'nuxt-tiptap-editor',
  ],
  tiptap: {
    prefix: 'Tiptap',
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage',
    storageKey: 'nuxt-color-mode',
  },
  image: {
    format: ['webp'],
  },
  css: ['@/assets/css/tailwind.css', '@/assets/css/main.css'],
  pages: true,

  shadcn: {
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },
  app: {
    pageTransition: { name: 'slide', mode: 'out-in' },
  },
});
