import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Resolve path relative to this config file (ESM-safe)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['@prisma/client', 'prisma', 'better-auth'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    // Enable Turbopack for development
    experimental: {
        turbo: {
            // Turbopack configuration - letting it handle module resolution naturally
        },
    },
    // Webpack configuration for production builds only
    webpack: (config, { isServer, dev }) => {
        // Ensure TS path aliases (~/* and @/*) in all modes
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            '~': path.resolve(__dirname, 'src'),
            '~/': path.resolve(__dirname, 'src'),
            '@': path.resolve(__dirname, 'src'),
            '@/': path.resolve(__dirname, 'src'),
            // Specific subpath aliases for robustness in various bundlers
            '~/app': path.resolve(__dirname, 'src/app'),
            '~/components': path.resolve(__dirname, 'src/components'),
            '~/lib': path.resolve(__dirname, 'src/lib'),
            '~/server': path.resolve(__dirname, 'src/server'),
            '~/actions': path.resolve(__dirname, 'src/actions'),
            '~/stores': path.resolve(__dirname, 'src/stores'),
            '~/inngest': path.resolve(__dirname, 'src/inngest'),
            '~/env': path.resolve(__dirname, 'src/env'),
        };

        // Note: Avoid extra plugins to keep lockfile unchanged in CF builds

        // Skip the rest when using Turbopack in development
        if (dev) return config;

        // Handle node: modules for production builds
        config.resolve.fallback = {
            ...config.resolve.fallback,
            sqlite3: false,
            'node:sqlite': false,
        };

        // External packages that should not be bundled
        config.externals = config.externals || [];
        if (isServer) {
            config.externals.push('sqlite3', 'node:sqlite');
        }

        // Re-enable minification for better production performance
        // config.optimization = config.optimization || {};
        // config.optimization.minimize = false;

        return config;
    },
}

export default nextConfig
