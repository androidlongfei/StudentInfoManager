const debug = require('debug')('app:lib:socketioHandle');
const jwt = require('jsonwebtoken');
const async = require('async');
const _ = require('underscore');

const User = require('../models/User');
const setting = require('../config/setting');

const allSockets = {};
// 请求 {token: ''}
// {failed: false, data:{}, msg:'err'}
const socketioHandle = {
    onConnection: function (serverListener) {
        debug('START socket.io');
        var io = require('socket.io')(serverListener);
        io.on('connection', function (socket) {
            debug('connected!', socket.id);
            socket.on('token', function (token) {
                debug('验证token')
                // debug('Got token!', token, typeof(token));
                if (token.token) {
                    verifyUser(token.token, socket);
                } else {
                    socket.emit('tokenRes', {
                        failed: false,
                        msg: '未知错误'
                    });
                }
            });
            // 连接断开
            socket.on('disconnect', function (msg) {
                debug('Got disconnect!', msg, socket.id);
                delete allSockets[socket.id];
                // var i = allClients.indexOf(socket);
                // allClients.splice(i, 1);
            });
        });
    },
    // 发送消息
    emitMessage: function (msgType, privilege, data) {
        // 复制一份，避免遍历处理过程中，出现错误
        let currSockets = _.clone(allSockets);
        // 同时处理，忽略异步顺序
        _.each(currSockets, function (value, key) {
            debug('each', key, value.userId, value.privileges, value.token);
            verifyToken(value.token, function (verifyResult) {
                // debug('verifyResult', key, verifyResult.failed);
                if (verifyResult.failed) {
                    value.socket.disconnect(0);
                } else {
                    // TODO 验证权限
                    value.socket.emit(msgType, data);
                }
            });
        });
    }
}

// 验证用户身份，验证失败断开
function verifyUser(token, socket) {
    verifyToken(token, function (verifyResult) {
        debug('verifyResult', verifyResult.failed);
        if (verifyResult.failed) {
            debug('验证失败', socket.id)
            socket.emit('tokenRes', verifyResult);
            socket.disconnect(0);
        } else {
            debug('验证成功', socket.id)
            allSockets[socket.id] = {
                token: token,
                userId: verifyResult.decodedToken.id,
                socket: socket,
                privileges: verifyResult.decodedToken.privileges
            };
            socket.emit('tokenRes', { failed: false });
            // socketioHandle.emitMessage('updateProgress', null, {type:'sampleStage1Progress', data:{}});
        }
    });
};
// 验证身份，解析token,查数据库，第一次连接和发送消息前验证
function verifyToken(token, callback) {
    // debug('verifyToken(token)');
    async.waterfall([
        // 验证TOEKEN
        function (cb) {
            jwt.verify(token, setting.SECRET, function (err, decodedToken) {
                // debug(' jwt.verify', decodedToken);
                if (err) {
                    cb({ failed: true, msg: '无效的登录凭据' });
                } else {
                    debug(decodedToken.id, decodedToken.privileges); // bar
                    cb(null, decodedToken);
                }
            });
        },
        function (decodedToken, cb) {
            User.findOne({
                where: {
                    id: decodedToken.id,
                    token: token
                }
            }).then(function (user) {
                if (user && !user.isDeleted && !user.disabled) {
                    cb(null, {
                        failed: false,
                        decodedToken: decodedToken
                    });
                } else {
                    cb({ failed: true, msg: '登录超时' });
                }
            });
        }
    ], function (err, result) {
        // debug('done', err, result);
        if (err) {
            callback(err);
        } else {
            callback(result);
        }
    });
};
// 断开连接
// const disconnect = (socket) => {
//     socket.disconnect(0);
// };
module.exports = socketioHandle;
