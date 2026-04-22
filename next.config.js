/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'build',
    distDir: 'build',
    compiler: {
        // Strip console.* in production builds, keep error/warn for visibility.
        removeConsole: { exclude: ['error', 'warn'] },
    },
    images: {
        // Serve modern formats from upstream (Cloudinary) where supported.
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    experimental: {
        // Tree-shake barrel imports from these packages so a single icon or
        // animation primitive doesn't drag the whole library into the bundle.
        optimizePackageImports: ['react-icons', 'framer-motion', 'firebase'],
    },
};

export default nextConfig;
