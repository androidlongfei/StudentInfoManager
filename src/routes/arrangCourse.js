const arrangCourseController = require('../controllers/ArrangCourse');
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
        path: '/arrangCourse',
        config: {
            handler: arrangCourseController.create,
            description: '增加排课表',
            notes: '返回课程信息',
            tags: ['api'],
            response: {
                // schema: schemaCourseModel
            },
            validate: {
                payload: {
                    courseName: Joi.string().required(),
                    courseCredits: Joi.string().required(),
                    department: Joi.string().required(),
                    professional: Joi.string().required(),
                    classId: Joi.number().integer().required(),
                    teacherId: Joi.number().integer().required(),
                    address: Joi.string().required(),
                    time: Joi.string().required(),
                    startTime: Joi.string(),
                    endTime: Joi.string(),
                    semester: Joi.string().required()
                }
            }
        }
    }, {
        // 删除班级路由
        method: 'DELETE',
        path: '/arrangCourse/{arrangCourseId}',
        config: {
            handler: arrangCourseController.delete,
            description: '删除已排课程',
            notes: '返回课程信息',
            tags: ['api'],
            response: {
                // schema: schemaCourseModel
            },
            validate: {
                params: {
                    arrangCourseId: Joi.number().integer().required(),
                }
            }
        }
    }, {
        method: 'PUT',
        path: '/arrangCourse/{arrangCourseId}',
        config: {
            handler: arrangCourseController.update,
            description: '编辑已排课程',
            notes: '返回课程信息',
            tags: ['api'],
            response: {
                // schema: schemaCourseModel,
            },
            validate: {
                params: {
                    arrangCourseId: Joi.number().integer().required(),
                },
                payload: {
                    courseId: Joi.number().integer(),
                    teacherId: Joi.number().integer(),
                    address: Joi.string(),
                    time: Joi.string(),
                    startTime: Joi.string(),
                    endTime: Joi.string(),
                    semester: Joi.string()
                }

            }
        },
    }, {
        method: 'GET',
        path: '/arrangCourse/{arrangCourseId}',
        config: {
            handler: arrangCourseController.findOneById,
            description: '根据ID获取已排课程',
            notes: '返回课程信息',
            tags: ['api'],
            response: {
                // schema: schemaCourseModel
            },
            validate: {
                params: {
                    arrangCourseId: Joi.number().integer().required()
                }
            }
        }
    }]
})()
