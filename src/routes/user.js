var userController = require('../controllers/user');
var Joi = require('joi');
// const debug = require('debug')('app:routes:user');

module.exports = (function () {
    return [{
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
        },
        {
            // 查询单个用户
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
                }
            }
        },
        {
            // 删除路由
            method: 'DELETE',
            path: '/user/{userId}',
            config: {
                handler: userController.delete,
                description: '删除用户',
                notes: '返回用户信息',
                tags: ['api'],
                response: {
                    // schema: schemaClassModel
                },
                validate: {
                    params: {
                        userId: Joi.number().integer().required(),
                    }
                }
            }
        },
        {
            // 更改密码
            method: 'POST',
            path: '/user/{userId}/changePassword',
            config: {
                handler: userController.changePassword,
                description: '更改密码',
                notes: '返回用户信息',
                tags: ['api'],
                response: {
                    // schema: generalUserModel,
                },
                validate: {
                    params: {
                        userId: Joi.number().integer().required(),
                    },
                    payload: {
                        oldPassword: Joi.string().required(),
                        newPassword: Joi.string().required()
                    }
                }
            }
        },
        {
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
                        password: Joi.string().required()
                    }
                }
            }
        }
    ]
})()
