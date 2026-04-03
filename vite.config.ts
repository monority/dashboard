import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        compression({ algorithm: 'gzip' }),
        compression({ algorithm: 'brotliCompress' }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                            return 'vendor-react';
                        }

                        if (id.includes('@tanstack') || id.includes('zustand') || id.includes('axios')) {
                            return 'vendor-data';
                        }

                        return 'vendor';
                    }

                    if (id.includes('/src/components/ui/')) {
                        return 'ui';
                    }

                    if (id.includes('/src/features/')) {
                        return 'features';
                    }

                    return undefined;
                },
            },
        },
    },
});
