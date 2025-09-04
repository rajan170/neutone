// @ts-nocheck
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
    // Turbopack configuration (replaces deprecated experimental.turbo)
    turbopack: {
        // letting it handle module resolution naturally
    },
    // Output configuration for Cloudflare Pages
    output: 'standalone',
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
            'src/app': path.resolve(__dirname, 'src/app'),
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

        // Treat certain native deps as commonjs externals to avoid invalid
        // code generation like "module.exports = node:sqlite" in edge builds.
        config.externals = config.externals || [];
        const makeCommonJsExternal = (request) => `commonjs ${request}`;
        config.externals.push((ctx, callback) => {
            const req = ctx?.request;
            if (req === 'sqlite3' || req === 'node:sqlite') {
                return callback(null, makeCommonJsExternal(req));
            }
            return callback();
        });

        // Add better handling for esbuild issues in Cloudflare Pages
        if (process.env.NODE_ENV === 'production') {
            // Ensure proper module resolution
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                crypto: false,
                stream: false,
                util: false,
                buffer: false,
                process: false,
            };

            // Add better externals handling for problematic modules
            config.externals.push((ctx, callback) => {
                const req = ctx?.request;
                if (req && (req.startsWith('node:') || req === 'async_hooks' || req === 'buffer' || req === 'crypto' || req === 'stream' || req === 'util' || req === 'process')) {
                    return callback(null, makeCommonJsExternal(req));
                }
                return callback();
            });
        }

        return config;
    },
}

export default nextConfig
