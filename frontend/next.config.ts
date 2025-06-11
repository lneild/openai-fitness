import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://your-backend-url.com/:path*',
            },
        ];
    },
};

export default nextConfig;
