import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // '/' for Vercel / Netlify / Hostinger root. For a sub-folder build use:
  // VITE_BASE=./ VITE_HASH_ROUTER=1 npm run build
  base: process.env.VITE_BASE || '/',
});
