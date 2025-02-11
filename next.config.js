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
              "default-src 'self';",
              "img-src 'self' data: blob: https://*.mapbox.com;",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.mapbox.com;",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.mapbox.com blob:;",
              "worker-src 'self' blob:;",
              "connect-src 'self' https://api.mapbox.com https://events.mapbox.com https://fonts.googleapis.com https://fonts.gstatic.com https://api.openweathermap.org;"
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