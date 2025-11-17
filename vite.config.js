import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages deployment configuration
// For custom domain: base is '/'
// For GitHub subdomain: base would be '/repo-name/'
const base = process.env.GITHUB_PAGES_BASE || '/'

export default defineConfig({
    base: base,
    plugins: [react()],
    server: {
        headers: {
            // Security headers for development
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
        }
    },
    build: {
        // Security: Remove source maps in production for better security
        sourcemap: false,
        // Minify for production
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true, // Remove console.logs in production
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                // Security: Obfuscate chunk names
                manualChunks: undefined,
            }
        }
    }
})

