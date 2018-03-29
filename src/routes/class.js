const classController = require('../controllers/class');
const Joi = require('joi');
// const debug = require('debug')('app:routes:user');

const schemaClassModel = Joi.object({
    name: Joi.string().description('班级名'),
    note: Joi.string().description('班级备注'),
    department: Joi.any().description('所属院系'),
    id: Joi.number().integer().description('班级ID'),
    createdAt: Joi.date().description('创建时间'),
    updatedAt: Joi.date().description('更新时间')
})

module.exports = (() => {
    return [{
        // 创建班级路由
        method: 'POST',
        path: '/class',
        config: {
            handler: classController.createClass,
            description: '创建班级',
            notes: '返回班级信息',
            tags: ['api'],
            response: {
                schema: schemaClassModel
            },
            validate: {
                payload: {
                    name: Joi.string().required().description('班级名字'),
                    note: Joi.string().required().description('备注'),
                    department: Joi.string().required().description('所属院系')
                }
            }
        }
    }, {
        // 删除班级路由
        method: 'DELETE',
        path: '/class/{classId}',
        config: {
            handler: classController.deleteClass,
            description: '删除班级',
            notes: '返回班级信息',
            tags: ['api'],
            response: {
                schema: schemaClassModel
            },
            validate: {
                params: {
                    classId: Joi.number().integer().required(),
                }
            }
        }
    }, {
        method: 'PUT',
        path: '/class/{classId}',
        config: {
            handler: classController.updateClass,
            description: '编辑班级信息',
            notes: '返回班级信息',
            tags: ['api'],
            response: {
                schema: schemaClassModel,
            },
            validate: {
                params: {
                    classId: Joi.number().integer().required(),
                },
                payload: {
                    name: Joi.string(),
                    department: Joi.string().allow(null),
                    note: Joi.string().allow(null),
                }

            }
        },
    }, {
        method: 'GET',
        path: '/class/{classId}',
        config: {
            handler: classController.findOneById,
            description: '根据班级ID获取班级信息',
            notes: '返回班级信息',
            tags: ['api'],
            response: {
                schema: schemaClassModel
            },
            validate: {
                params: {
                    classId: Joi.number().integer().required().description('班级ID')
                }
            }
        }
    }, {
        method: 'GET',
        path: '/class/count',
        config: {
            handler: classController.count,
            description: '根据条件分页获取班级列表',
            notes: '返回班级列表',
            tags: ['api'],
            response: {
                // schema: schemaClassModel
            },
            validate: {
                query: {
                    name: Joi.string().description('班级名字'),
                    department: Joi.string().description('所属院系'),
                    currentPage: Joi.number().integer().description('当前页'),
                    pageSize: Joi.number().integer().description('每页条数')
                }
            }
        }
    }]
})()
