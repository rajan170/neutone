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
            '@': path.resolve(__dirname, 'src'),
        };

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

        // Disable minification completely to work around webpack issue  
        config.optimization = config.optimization || {};
        config.optimization.minimize = false;

        return config;
    },
}

export default nextConfig
