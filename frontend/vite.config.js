import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(() => {

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],

    optimizeDeps: {
      include: ['framer-motion'],
    },

    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'framer-motion': ['framer-motion'],
          },
        },
      },
    },

    server: {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      },

      proxy: {
        '/api': 'http://localhost:8000',
        '/accounts': 'http://localhost:8000',
      }
    }
  }
})
