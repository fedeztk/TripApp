/** @type {import('next').NextConfig} */
const withOffline = require("next-offline");



const nextConfig = {
  reactStrictMode: true,
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

<<<<<<< HEAD
module.exports = withOffline(nextConfig);
=======
module.exports = withOffline(nextConfig);
>>>>>>> 67ac7a7 (feat(manifest.json, next.config.js): elementi necessari per rendere l'app una PWA)
