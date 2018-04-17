const scoreController = require('../controllers/score');
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
        path: '/score',
        config: {
            handler: scoreController.create,
            description: '增加学生课程成绩',
            notes: '返回学生课程信息',
            tags: ['api'],
            response: {
                // schema: schemaCourseModel
            },
            validate: {
                payload: {
                    arrangCourseId: Joi.number().integer().required(),
                    studentId: Joi.number().integer().required(),
                    score: Joi.number().integer().required()
                }
            }
        }
    }, {
        // 删除班级路由
        method: 'DELETE',
        path: '/score/{scoreId}',
        config: {
            handler: scoreController.delete,
            description: '删除课程成绩',
            notes: '返回成绩信息',
            tags: ['api'],
            response: {
                // schema: schemaCourseModel
            },
            validate: {
                params: {
                    scoreId: Joi.number().integer().required(),
                }
            }
        }
    }, {
        method: 'PUT',
        path: '/score/{scoreId}',
        config: {
            handler: scoreController.update,
            description: '编辑课程成绩信息',
            notes: '返回成绩信息',
            tags: ['api'],
            response: {
                // schema: schemaCourseModel,
            },
            validate: {
                params: {
                    scoreId: Joi.number().integer().required(),
                },
                payload: {
                    score: Joi.string().required()
                }

            }
        },
    }, {
        method: 'GET',
        path: '/score/{scoreId}',
        config: {
            handler: scoreController.findOneById,
            description: '根据成绩ID获取成绩信息',
            notes: '返回成绩信息',
            tags: ['api'],
            response: {
                // schema: schemaCourseModel
            },
            validate: {
                params: {
                    scoreId: Joi.number().integer().required()
                }
            }
        }
    }]
})()
