// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   app: {
    head: {
      title: 'FitLocker | Best outfit platform', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/main.ico' },
      ],
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    "~/assets/css/style.css"
  ],
  
})
