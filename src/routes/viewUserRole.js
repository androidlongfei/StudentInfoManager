const viewUserRoleController = require('../controllers/views/viewUserRole');
const Joi = require('joi');
// const debug = require('debug')('app:routes:user');

module.exports = (() => {
    return [{
        method: 'GET',
        path: '/user/count',
        config: {
            handler: viewUserRoleController.count,
            description: '根据条件分页获取用户列表',
            notes: '返回用户列表信息',
            tags: ['api'],
            response: {
                // schema: schemaClassModel
            },
            validate: {
                query: {
                    realName: Joi.string().description('姓名'),
                    roleName: Joi.string().description('角色名'),
                    userName: Joi.string().description('用户名'),
                    currentPage: Joi.number().integer().description('当前页'),
                    pageSize: Joi.number().integer().description('每页条数')
                }
            }
        }
    }, {
        method: 'GET',
        path: '/user/{userId}/role',
        config: {
            handler: viewUserRoleController.findOneById,
            description: '根据用户ID获取用户角色信息',
            notes: '返回用户信息',
            tags: ['api'],
            response: {
                // schema: schemaClassModel
            },
            validate: {
                params: {
                    userId: Joi.number().integer().required()
                }
            }
        }
    }]
})()
