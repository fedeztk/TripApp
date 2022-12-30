/** @type {import('next').NextConfig} */
const withOffline = require("next-offline");



const nextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/api/auth/signin',
  //       permanent: true,
  //     },
  //   ]
  // },
}

module.exports = withOffline(nextConfig);