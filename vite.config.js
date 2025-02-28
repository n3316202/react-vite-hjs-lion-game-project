import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // find: 해당 경로의 이름. 실제로 import문에 적용된다.
    // replacement: 경로 지정. 이때, path.resolve를 이용한다.
    alias: [{ find: '@', replacement: '/src' }],
  },
})
