import { defineConfig } from 'vitest/config'
import { quasar } from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue(), quasar()],
  test: {
    // browser: {
    //   enabled: true,
    //   provider: 'playwright',
    //   instances: [{ browser: 'chromium' }],
    // },
    include: ['**/*.{test,spec}.{ts,vue}'],
  },
})
