/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      windowHistorySupport: true,
    },
   images: {
      remotePatterns: [
         { protocol: 'https', hostname: 'images.ctfassets.net', port: '' },
      ],
},}

module.exports = nextConfig
