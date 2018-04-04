const teacherController = require('../controllers/teacher');
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
        path: '/teacher',
        config: {
            handler: teacherController.create,
            description: '创建教师',
            notes: '返回教师信息',
            tags: ['api'],
            response: {
                schema: null
            },
            validate: {
                payload: {
                    idCardNo: Joi.number().required(),
                    name: Joi.string().required(),
                    title: Joi.string().required(),
                    gender: Joi.number().integer().required(),
                    age: Joi.number().integer().required(),
                    birth: Joi.string().required(),
                    telephone: Joi.string(),
                    department: Joi.string(),
                    address: Joi.string()
                }
            }
        }
    }, {
        // 删除
        method: 'DELETE',
        path: '/teacher/{teacherId}',
        config: {
            handler: teacherController.delete,
            description: '删除教师',
            notes: '返回教师信息',
            tags: ['api'],
            response: {
                // schema: schemaClassModel
            },
            validate: {
                params: {
                    teacherId: Joi.number().integer().required(),
                }
            }
        }
    }, {
        method: 'PUT',
        path: '/teacher/{teacherId}',
        config: {
            handler: teacherController.update,
            description: '编辑教师信息',
            notes: '返回教师信息',
            tags: ['api'],
            response: {
                // schema: schemaClassModel,
            },
            validate: {
                params: {
                    teacherId: Joi.number().integer().required(),
                },
                payload: {
                    idCardNo: Joi.number().integer(),
                    name: Joi.string(),
                    title: Joi.string(),
                    gender: Joi.number().integer(),
                    birth: Joi.string(),
                    telephone: Joi.string(),
                    department: Joi.string(),
                    address: Joi.string()
                }

            }
        },
    }, {
        method: 'GET',
        path: '/teacher/{teacherId}',
        config: {
            handler: teacherController.findOneById,
            description: '根据教师ID获取教师信息',
            notes: '返回教师信息',
            tags: ['api'],
            response: {
                // schema: schemaClassModel
            },
            validate: {
                params: {
                    teacherId: Joi.number().integer().required()
                }
            }
        }
    }, {
        method: 'GET',
        path: '/teacher/count',
        config: {
            handler: teacherController.count,
            description: '根据条件分页获取教师列表',
            notes: '返回教师列表',
            tags: ['api'],
            response: {
                // schema: schemaClassModel
            },
            validate: {
                query: {
                    teacherNo: Joi.string().description('教师编号'),
                    department: Joi.string().description('所属院系'),
                    name: Joi.string().description('名字'),
                    currentPage: Joi.number().integer().description('当前页'),
                    pageSize: Joi.number().integer().description('每页条数')
                }
            }
        }
    }]
})()
