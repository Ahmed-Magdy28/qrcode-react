/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import eslint from 'vite-plugin-eslint';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
   plugins: [
      react(),
      tailwindcss(),
      eslint({
         cache: false, // Optional: disables caching for faster live feedback
         include: ['src/**/*.ts', 'src/**/*.tsx'], // only lint TypeScript files
         exclude: ['node_modules', 'dist'], // ignore unnecessary folders
      }),
   ],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },
});
