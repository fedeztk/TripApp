/** @type {import('next').NextConfig} */
const withOffline = require("next-offline");

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

const nextConfig = {
  reactStrictMode: true,
}
module.exports = withPWA(nextConfig);

