/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.slack-edge.com', 'secure.gravatar.com'],
  },
}

module.exports = nextConfig
