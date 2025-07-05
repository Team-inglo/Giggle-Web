/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
    visualizer({
      filename: 'dist/stats.json',
      json: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // src 폴더를 @로 절대 경로 설정
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': [
            'framer-motion',
            'embla-carousel-react',
            'embla-carousel-autoplay',
          ],
          'vendor-forms': [
            'react-hook-form',
            'zustand',
            '@tanstack/react-query',
          ],
          'vendor-external': [
            'react-kakao-maps-sdk',
            'react-daum-postcode',
            'react-signature-canvas',
          ],
          'vendor-http': ['axios'],
          'employer-pages': [
            '@/pages/Employer/Post/EmployerPostPage',
            '@/pages/Employer/Profile/EmployerProfilePage',
            '@/pages/Employer/ApplicantList/EmployerApplicantListPage',
            '@/pages/Employer/Signup/EmployerSignupPage',
            '@/pages/Employer/Signup/EmployerSignupInfoPage',
          ],
          'document-pages': [
            '@/pages/WriteDocuments/WriteDocumentsPage',
            '@/pages/WriteDocuments/DocumentPreviewPage',
            '@/pages/WriteDocuments/DocumentViewerPage',
            '@/pages/WriteDocuments/RequestModifyPage',
          ],
          'resume-pages': [
            '@/pages/Resume/ManageResumePage',
            '@/pages/Resume/IntroductionPage',
            '@/pages/Resume/PostLanguagePage',
            '@/pages/Resume/EditLanguagesPage',
            '@/pages/Resume/ScrappedJobPostsPage',
          ],
        },
        chunkFileNames: () => {
          return `assets/js/[name]-[hash].js`;
        },
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.').pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) {
            return 'assets/images/[name]-[hash].[ext]';
          }
          if (/css/i.test(extType || '')) {
            return 'assets/css/[name]-[hash].[ext]';
          }
          if (/woff2?|ttf|eot/i.test(extType || '')) {
            return 'assets/fonts/[name]-[hash].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
    sourcemap: process.env.NODE_ENV === 'development',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: process.env.NODE_ENV === 'production',
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'zustand',
      'axios',
    ],
  },
  server: {
    host: true,
    port: 5173,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'clover', 'json'],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.stories.{ts,tsx}',
        'src/types/**',
        'src/__tests__/**',
        'node_modules/**',
      ],
    },
  },
});
