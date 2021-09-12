const securityHeaders = [
  {
    key: 'Referrer-Policy',
    value: 'unsafe-url',
  }
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
