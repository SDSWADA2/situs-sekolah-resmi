// Next.js 15 config with PWA
import withPWA from 'next-pwa'

const isProd = process.env.NODE_ENV === 'production'

export default withPWA({
  experimental: { appDir: true },
  pwa: {
    dest: 'public',
    disable: !isProd,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com', 's3.amazonaws.com']
  }
})
