import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Targets do minificador CSS (Lightning CSS). Sem isso ele colapsa pares
    // -webkit-/padrão em "última declaração vence" - o backdrop-filter do
    // .nav era descartado no build de produção.
    cssTarget: ['chrome111', 'edge111', 'firefox128', 'safari16.4'],
  },
})
