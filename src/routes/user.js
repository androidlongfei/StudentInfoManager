var userController = require('../controllers/user');
var Joi = require('joi');
const debug = require('debug')('app:routes:user');

module.exports = (function () {
    return [
        {
            // 登录路由
            method: 'POST',
            path: '/login',
            config: {
                handler: userController.login,
                description: '登录',
                notes: '返回token、用户信息',
                tags: ['api'],
                response: {
                    // schema: userLoginModel,
                },
                validate: {
                    payload: {
                        username: Joi.required(),
                        password: Joi.required()
                    }
                }
            }
        }, {
            method: 'GET',
            path: '/user/{userId}',
            config: {
                handler: userController.findOneById,
                description: '0.2 获取用户信息',
                notes: '返回 用户 信息',
                tags: ['api'],
                response: {
                    schema: null
                },
                validate: {
                    params: {
                        userId: Joi.number().integer().required()
                    }
                },
                plugins: {
                    rbac: {
                        target: {
                            'credentials:username': 'admin'
                        },
                        effect: 'permit'
                    }
                }
            }
        }, {
            // 创建用户路由
            method: 'POST',
            path: '/user',
            config: {
                handler: userController.create,
                description: '创建用户',
                notes: '返回新用户信息',
                tags: ['api'],
                response: {
                    // schema: generalUserModel,
                },
                validate: {
                    payload: {
                        username: Joi.string().required(),
                        realName: Joi.string().required(),
                        department: Joi.string(),
                        password: Joi.string().required()
                    }
                },
                plugins: {
                    rbac: {
                        target: {
                            'credentials:username': 'admin'
                        },
                        effect: 'permit'
                    }
                }
            }
        }
    ]
})()
