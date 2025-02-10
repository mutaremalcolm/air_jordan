/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com;",
              "img-src 'self' data: blob: https://*.mapbox.com;",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.mapbox.com;",
              "script-src 'self' 'unsafe-inline' https://api.mapbox.com;",
              "connect-src 'self' https://api.mapbox.com https://events.mapbox.com https://fonts.googleapis.com https://fonts.gstatic.com;"
            ].join(' ')
          }
        ],
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['api.mapbox.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.mapbox.com',
      },
    ],
  }
};

module.exports = nextConfig;