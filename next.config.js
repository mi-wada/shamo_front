const securityHeaders = [
  {
    key: 'Referrer-Policy',
    value: 'unsafe-url',
  },
  {
    key: 'Access-Control-Allow-Origin',
    value: '*',
  },
]

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
