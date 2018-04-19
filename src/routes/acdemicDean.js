const acdemicDeanController = require('../controllers/acdemicDean');
const Joi = require('joi');
// const debug = require('debug')('app:routes:user');

const schemaStudentModel = Joi.object({
    name: Joi.string().description('学生名'),
    note: Joi.string().description('班级备注'),
    departmentsNo: Joi.any().description('所属院系'),
    id: Joi.number().integer().description('班级ID'),
    createdAt: Joi.date().description('创建时间'),
    updatedAt: Joi.date().description('更新时间')
})

module.exports = (() => {
    return [{
        // 创建
        method: 'POST',
        path: '/acdemicDean',
        config: {
            handler: acdemicDeanController.create,
            description: '创建教务员',
            notes: '返回教师信息',
            tags: ['api'],
            response: {
                schema: null
            },
            validate: {
                payload: {
                    idCardNo: Joi.number().required(),
                    name: Joi.string().required(),
                    gender: Joi.number().required(),
                    birth: Joi.string().required(),
                    telephone: Joi.string(),
                    department: Joi.string(),
                    address: Joi.string(),
                    age: Joi.number().integer().required()
                }
            }
        }
    }, {
        // 删除
        method: 'DELETE',
        path: '/acdemicDean/{acdemicDeanId}',
        config: {
            handler: acdemicDeanController.delete,
            description: '删除教务员',
            notes: '返回教务员信息',
            tags: ['api'],
            response: {
                // schema: schemaClassModel
            },
            validate: {
                params: {
                    acdemicDeanId: Joi.number().integer().required(),
                }
            }
        }
    }, {
        method: 'PUT',
        path: '/acdemicDean/{acdemicDeanId}',
        config: {
            handler: acdemicDeanController.update,
            description: '编辑教务员信息',
            notes: '返回教务员信息',
            tags: ['api'],
            response: {
                // schema: schemaClassModel,
            },
            validate: {
                params: {
                    acdemicDeanId: Joi.number().integer().required(),
                },
                payload: {
                    idCardNo: Joi.number(),
                    name: Joi.string(),
                    gender: Joi.number(),
                    birth: Joi.string(),
                    telephone: Joi.string(),
                    department: Joi.string(),
                    address: Joi.string(),
                    age: Joi.number().integer()
                }

            }
        },
    }, {
        method: 'GET',
        path: '/acdemicDean/{acdemicDeanId}',
        config: {
            handler: acdemicDeanController.findOneById,
            description: '根据教务员ID获取教师信息',
            notes: '返回教务员信息',
            tags: ['api'],
            response: {
                // schema: schemaClassModel
            },
            validate: {
                params: {
                    acdemicDeanId: Joi.number().integer().required()
                }
            }
        }
    }, {
        method: 'GET',
        path: '/acdemicDean/count',
        config: {
            handler: acdemicDeanController.count,
            description: '根据条件分页获取教务员列表',
            notes: '返回教务员列表',
            tags: ['api'],
            response: {
                // schema: schemaClassModel
            },
            validate: {
                query: {
                    acdemicDeanNo: Joi.string().description('教务员编号'),
                    department: Joi.string().description('所属院系'),
                    name: Joi.string().description('名字'),
                    currentPage: Joi.number().integer().description('当前页'),
                    pageSize: Joi.number().integer().description('每页条数')
                }
            }
        }
    }]
})()
