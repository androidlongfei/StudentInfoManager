const viewStudentClassController = require('../controllers/views/viewStudentClass');
const Joi = require('joi');
// const debug = require('debug')('app:routes:user');

module.exports = (() => {
    return [{
        method: 'GET',
        path: '/student/count',
        config: {
            handler: viewStudentClassController.count,
            description: '根据条件分页获取学生列表',
            notes: '返回学生列表信息',
            tags: ['api'],
            response: {
                // schema: schemaClassModel
            },
            validate: {
                query: {
                    className: Joi.string().description('班级名字'),
                    studentDepartment: Joi.string().description('所属院系'),
                    idCardNo: Joi.string().description('身份证号'),
                    currentPage: Joi.number().integer().description('当前页'),
                    pageSize: Joi.number().integer().description('每页条数')
                }
            }
        }
    }]
})()
