import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
},
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/books/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/profile/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/book-images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/profile-images/**',
      },
      {
        protocol: 'https',
        hostname: 'sea-lion-app-jl247.ondigitalocean.app',
        port:'8080',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'sea-lion-app-jl247.ondigitalocean.app',
        port:'8080',
        pathname: '/profile/**',
      },
      {
        protocol: 'https',
        hostname: 'sea-lion-app-jl247.ondigitalocean.app',
        port:'8080',
        pathname: '/book-images/**',
      },
      {
        protocol: 'https',
        hostname: 'sea-lion-app-jl247.ondigitalocean.app',
        port:'8080',
        pathname: '/profile-images/**',
      },
      {
        protocol: 'https',
        hostname: 'sea-lion-app-jl247.ondigitalocean.app',
        port:'8080',
        pathname: '/books/**',
      },
    ],
  },
};

export default nextConfig;
