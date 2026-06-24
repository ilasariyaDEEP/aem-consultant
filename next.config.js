/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Serve modern formats (WebP/AVIF) for faster global delivery
    formats: ['image/avif', 'image/webp'],
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

  async headers() {
    return [
      // ── Immutable static assets (JS/CSS chunks, fonts) ──────────────────
      // Next.js content-hashes these filenames, so 1-year cache is safe.
      // CDN edge nodes worldwide will serve these instantly after first hit.
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          { key: 'Vary', value: 'Accept-Encoding' },
        ],
      },
      // ── Public static files (images, robots.txt, sitemap.xml, llm.txt) ──
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
            // 30 days cache, 1 day background revalidation
          },
          { key: 'Vary', value: 'Accept-Encoding' },
        ],
      },
      {
        source: '/:file(robots\\.txt|sitemap\\.xml|llm\\.txt|og-image\\.png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=3600',
            // 24h cache for SEO files; crawlers re-check daily
          },
        ],
      },
      // ── HTML pages ───────────────────────────────────────────────────────
      // Short max-age + stale-while-revalidate: CDN edge serves stale
      // instantly (zero TTFB) while quietly refreshing in background.
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, stale-while-revalidate=600',
          },
          { key: 'Vary', value: 'Accept-Encoding' },
          // Strict security headers (bonus for Core Web Vitals)
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
