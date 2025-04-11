import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Sortie correctement configurée pour Vercel
    emptyOutDir: true  // Nettoie le répertoire de sortie avant de reconstruire
  }
});