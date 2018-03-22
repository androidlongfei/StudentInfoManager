const studentController = require('../controllers/student');
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
        // 创建班级路由
        method: 'POST',
        path: '/student',
        config: {
            handler: studentController.create,
            description: '创建学生',
            notes: '返回学生信息',
            tags: ['api'],
            response: {
                schema: null
            },
            validate: {
                payload: {
                    idCardNo: Joi.number().integer().required(),
                    name: Joi.string().required(),
                    gender: Joi.number().integer().required(),
                    birth: Joi.string().required(),
                    telephone: Joi.string(),
                    admission: Joi.string(),
                    classId: Joi.number().integer(),
                    address: Joi.string()
                }
            }
        }
    }, {
        // 删除班级路由
        method: 'DELETE',
        path: '/student/{studentId}',
        config: {
            handler: studentController.delete,
            description: '删除学生',
            notes: '返回学生信息',
            tags: ['api'],
            response: {
                // schema: schemaClassModel
            },
            validate: {
                params: {
                    studentId: Joi.number().integer().required(),
                }
            }
        }
    }, {
        method: 'PUT',
        path: '/student/{studentId}',
        config: {
            handler: studentController.update,
            description: '编辑学生信息',
            notes: '返回学生信息',
            tags: ['api'],
            response: {
                // schema: schemaClassModel,
            },
            validate: {
                params: {
                    studentId: Joi.number().integer().required(),
                },
                payload: {
                    idCardNo: Joi.number().integer().required(),
                    name: Joi.string().required(),
                    gender: Joi.number().integer().required(),
                    birth: Joi.string().required(),
                    telephone: Joi.string(),
                    admission: Joi.string(),
                    classId: Joi.number().integer(),
                    address: Joi.string()
                }

            }
        },
    }, {
        method: 'GET',
        path: '/student/{studentId}',
        config: {
            handler: studentController.findOneById,
            description: '根据学生ID获取学生信息',
            notes: '返回学生信息',
            tags: ['api'],
            response: {
                // schema: schemaClassModel
            },
            validate: {
                params: {
                    studentId: Joi.number().integer().required()
                }
            }
        }
    }]
})()
