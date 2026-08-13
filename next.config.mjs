/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return {
      // Sirve el sitio estático (public/site.html) en la raíz "/".
      // beforeFiles se ejecuta antes del enrutado de archivos, garantizando
      // que "/" siempre muestre el sitio real de NEXTLI.
      beforeFiles: [{ source: '/', destination: '/site.html' }],
    }
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
