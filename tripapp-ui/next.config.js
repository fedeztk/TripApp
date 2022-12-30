/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");


const nextConfig = {
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

module.exports = withPWA(nextConfig);