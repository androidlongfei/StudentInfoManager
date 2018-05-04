import Hapi from 'hapi'
// import _ from 'underscore'
const jwt = require('jsonwebtoken');
const Boom = require('boom');
import doc from './lib/doc'

import routes from './routes'
import setting from './config/setting'
import Table from './lib/db/table'
// import socketioHandle from './lib/socketioHandle'

import createDebug from 'debug'
const debug = createDebug('app:index')

const server = new Hapi.Server()

server.connection({ port: setting.port })

// socketioHandle.onConnection(server.listener)

// swagger文档插件
server.register(doc)

// debug('routes:', routes)

// 跨域插件
server.register({
    register: require('hapi-cors'),
    options: {
        methods: ['POST, GET, OPTIONS, PUT, DELETE'],
        headers: [
            'Accept',
            'Content-Type',
            'Authorization',
            'Token',
            'X-Access-Token',
            'Cache-Control',
            'X-Requested-With'
        ]
    }
});

// 白名单不需要token校验
const whiteList = [
    '/login', '/app', '/class', '/departments', '/professionals',
    `${setting.routePrefix}/login`, `${setting.routePrefix}/app`,
    `${setting.routePrefix}/class`, `${setting.routePrefix}/departments`,
    `${setting.routePrefix}/professionals`
]

// 测试,不需要token
const test = false

// token校验,所有request请求先经过它
server.ext({
    type: 'onRequest',
    method: function (request, reply) {
        let path = request.path
        let method = request.method
        debug('----------onRequest!!!', method, path)
        // debug('in whiteList', whiteList.includes(path))
        if (path.indexOf('/documentation') > -1 || path.indexOf('/swagger') > -1) {
            // 测试 UI 不需要token
            return reply.continue()
        } else if (whiteList.includes(path)) {
            // 登录 ,不需要验证token
            request.headers.token = 'not token'
            return reply.continue()
        } else {
            if (test) {
                return reply.continue();
            }
            if (method === 'options') {
                // 跨域嗅探
                return reply({ code: 200 })
            }
            let token = request.headers.token || request.query.token || request.headers['x-access-token'] || request.headers['accept'] || request.headers['content-type'] || request.headers['authorization']
            // debug('client token', token)
            // 解码token
            jwt.verify(token, setting.SECRET, (err, decoded) => {
                // debug('onRequest decoded =>', decoded)
                if (err) {
                    debug('验证token失败--------', err)
                    let error = Boom.unauthorized('身份验证失败！登录超时，请重新登录！')
                    error.output.payload.code = 50000;
                    reply(error)
                } else {
                    // debug('token正确-------', decoded)
                    request.user = decoded
                    request.auth.credentials = decoded
                    return reply.continue()
                }
            });
        }
    }
});

// 静态资源
server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }
    server.route({
        method: 'GET',
        path: '/test',
        handler: function (request, reply) {
            reply.file('./public/test.html');
        }
    });
})


// 增加前缀
var prefixize = function (route) {
    // route.path = setting.routePrefix + route.path;
    // console.log('route.path', route.path)
    return route;
};
// register router
// console.log('routes---', routes)
for (var route in routes) {
    // console.log('route', routes[route])
    server.route(routes[route].map(prefixize));
}


// delete table
// Table.dropTable()

// create table
Table.createTable()

server.start(function (err) {
    if (err) {
        console.log(`启动服务error: ${err}`);
        // debug.error(`启动服务error: ${err}`)
    }

    debug(`Started on port: ${setting.port}`)
})
