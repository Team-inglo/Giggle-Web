import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // src 폴더를 @로 절대 경로 설정
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
