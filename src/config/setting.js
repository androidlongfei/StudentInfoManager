module.exports = {
    port: process.env.PORT || 3800,
    SECRET: 'GULP',
    routePrefix: '/api/v1',
    detaultPwd: '000000', // 默认密码
    // TokenExpirationSeconds: 60 * 60 * 24 * 111 // s m h d
    TokenExpirationSeconds: 60 * 30 // 测试时间为 30分钟
}
