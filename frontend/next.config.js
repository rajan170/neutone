import path from 'node:path'

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
        // Skip webpack config when using Turbopack in development
        if (dev) return config;
        
        // Handle node: modules for production builds
        config.resolve.fallback = {
            ...config.resolve.fallback,
            sqlite3: false,
            'node:sqlite': false,
        };

        // Ensure TS path aliases (~/* and @/*) work in production builds
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            '~': path.resolve(__dirname, 'src'),
            '@': path.resolve(__dirname, 'src'),
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
