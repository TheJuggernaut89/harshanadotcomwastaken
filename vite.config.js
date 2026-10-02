import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
export default defineConfig({
  plugins: [react()],
  publicDir: 'portfolio-public',
  build: { sourcemap: false, chunkSizeWarningLimit: 300 },
  server: { host: '127.0.0.1' },
});
