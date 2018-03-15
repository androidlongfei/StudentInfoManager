import Hapi from 'hapi'
import _ from 'underscore'
const jwt = require('jsonwebtoken');
const Boom = require('boom');
import doc from './lib/doc'

import routes from './routes'
import setting from './config/setting'
import Table from './lib/db/table'
import socketioHandle from './lib/socketioHandle'

import createDebug from 'debug'
const debug = createDebug('app:index')

const server = new Hapi.Server()

server.connection({ port: setting.port })

socketioHandle.onConnection(server.listener)

// swagger文档插件
server.register(doc)

debug('routes:', routes)

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

// token校验,所有request请求先经过它
server.ext({
    type: 'onRequest',
    method: function (request, reply) {
        let path = request.path
        let method = request.method
        debug('onRequest!!!', path, method)

        // 测试
        if (path.indexOf('/documentation') > -1 || path.indexOf('/swagger') > -1) {
            debug('test', request.headers.token)
            return reply.continue();
        } else if (path === '/login') {
            // 登录 ,不需要验证token
            debug('login')
            request.headers.token = 'not token'
            return reply.continue()
        } else if (path === `${setting.routePrefix}/login` ||
            request.path === `${setting.routePrefix}/app` ||
            request.path === `${setting.routePrefix}/config`) {
            // 进入登陆流程
            request.headers.token = 'not be verified!'
            return reply.continue()
        } else {
            let plamformToken = {
                'request.headers.token': request.headers.token,
                'request.query.token': request.query.token,
                'x-access-token': request.headers['x-access-token'],
                'accept': request.headers['accept'],
                'content-type': request.headers['content-type'],
                'authorization': request.headers['authorization']
            }
            // debug('plamformToken', plamformToken)
            let token = request.headers.token || request.query.token || request.headers['x-access-token'] || request.headers['accept'] || request.headers['content-type'] || request.headers['authorization']
            debug('client token', token)
            // 解码token
            jwt.verify(token, setting.SECRET, function (err, decoded) {
                debug('decoded', decoded)
                if (err) {
                    console.log(err, decoded) // bar
                    let error = Boom.unauthorized('身份验证失败！登录超时，请重新登录！')
                    error.output.payload.code = 1001;
                    reply(error)
                } else {
                    decoded.userId = decoded.id
                    request.token = decoded
                    request.auth.credentials = decoded
                    debug(decoded.userId, decoded.privileges)
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

debug('test gulp 11')


// 增加前缀
var prefixize = function (route) {
    route.path = setting.routePrefix + route.path;
    console.log('route.path', route.path, typeof route.path)
    return route;
};
// register router
for (var route in routes) {
    server.route(routes[route].map(prefixize));
    // console.log('route', routes[route])
}


// delete table
// Table.dropTable()

// create table
// Table.createTable()

server.start(function (err) {
    if (err) {
        debug.error(`启动服务error: ${err}`)
    }

    debug(`Started on port: ${setting.port}`)
})
