import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'https://estatehub-server.onrender.com',
                secure: false,
                changeOrigin: true,
            },
        },
    },
    plugins: [react()],
})
 