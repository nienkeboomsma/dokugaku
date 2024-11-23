/** @type {import('next').NextConfig} */
module.exports = {
  httpAgentOptions: {
    keepAlive: false,
  },
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
}
