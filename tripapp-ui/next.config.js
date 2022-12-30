/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    }
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

module.exports = nextConfig
