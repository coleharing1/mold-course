import { withContentlayer } from 'next-contentlayer2'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Polyfill Node.js globals for client-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: false,
        crypto: false,
        stream: false,
        util: false,
        fs: false,
        path: false,
        os: false,
        constants: false,
      };
      
      // Define process and other globals for client-side
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env': JSON.stringify(process.env),
          'process.browser': JSON.stringify(true),
          'process.version': JSON.stringify(process.version),
          'process.platform': JSON.stringify('browser'),
          'process.nextTick': 'undefined',
          'global': 'globalThis',
        })
      );
      
      // Provide process polyfill
      config.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
        })
      );
    }
    
    return config;
  },
}

export default withContentlayer(nextConfig)