import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/right-now/',
  plugins: [
    preact(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Right Now',
        short_name: 'RightNow',
        description: 'Instant calm. Simple exercises to regulate your state.',
        theme_color: '#FAF8F5',
        background_color: '#FAF8F5',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/right-now/',
        start_url: '/right-now/',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        shortcuts: [
          {
            name: 'Calm Now (60s)',
            short_name: 'Calm',
            description: 'Quick 60-second calming exercise',
            url: '/right-now/x/phys_sigh?dur=60',
            icons: [{ src: 'shortcut-calm.png', sizes: '96x96' }]
          },
          {
            name: 'Slow Breath (2m)',
            short_name: 'Breathe',
            description: 'Two-minute paced breathing',
            url: '/right-now/x/paced_breath?dur=120',
            icons: [{ src: 'shortcut-breathe.png', sizes: '96x96' }]
          },
          {
            name: 'Ground (2m)',
            short_name: 'Ground',
            description: 'Two-minute grounding exercise',
            url: '/right-now/x/ground_54321?dur=120',
            icons: [{ src: 'shortcut-ground.png', sizes: '96x96' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ]
})
