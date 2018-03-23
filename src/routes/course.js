const courseController = require('../controllers/course');
const Joi = require('joi');
// const debug = require('debug')('app:routes:user');

const schemaCourseModel = Joi.object({
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
        path: '/course',
        config: {
            handler: courseController.create,
            description: '创建课程',
            notes: '返回课程信息',
            tags: ['api'],
            response: {
                // schema: schemaCourseModel
            },
            validate: {
                payload: {
                    name: Joi.string().required(),
                    credits: Joi.number().integer().required()
                }
            }
        }
    }, {
        // 删除班级路由
        method: 'DELETE',
        path: '/course/{courseId}',
        config: {
            handler: courseController.delete,
            description: '删除课程',
            notes: '返回课程信息',
            tags: ['api'],
            response: {
                // schema: schemaCourseModel
            },
            validate: {
                params: {
                    courseId: Joi.number().integer().required(),
                }
            }
        }
    }, {
        method: 'PUT',
        path: '/course/{courseId}',
        config: {
            handler: courseController.update,
            description: '编辑课程信息',
            notes: '返回课程信息',
            tags: ['api'],
            response: {
                // schema: schemaCourseModel,
            },
            validate: {
                params: {
                    courseId: Joi.number().integer().required(),
                },
                payload: {
                    name: Joi.string(),
                    credits: Joi.number().integer()
                }

            }
        },
    }, {
        method: 'GET',
        path: '/course/{courseId}',
        config: {
            handler: courseController.findOneById,
            description: '根据课程ID获取课程信息',
            notes: '返回课程信息',
            tags: ['api'],
            response: {
                // schema: schemaCourseModel
            },
            validate: {
                params: {
                    courseId: Joi.number().integer().required()
                }
            }
        }
    }]
})()
