module.exports = {
    port: process.env.PORT || 3800,
    SECRET: 'GULP',
    routePrefix: '/api/v1',
    TokenExpirationSeconds: 60 * 60 * 24 * 111 // s m h d
}
