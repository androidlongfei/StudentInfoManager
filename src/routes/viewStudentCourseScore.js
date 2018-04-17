const viewStudentCourseScoreController = require('../controllers/views/viewStudentCourseScore');
const Joi = require('joi');
// const debug = require('debug')('app:routes:user');

module.exports = (() => {
    return [{
        method: 'GET',
        path: '/score/count',
        config: {
            handler: viewStudentCourseScoreController.count,
            description: '根据条件分页获取成绩列表',
            notes: '返回成绩列表信息',
            tags: ['api'],
            response: {
                // schema: schemaClassModel
            },
            validate: {
                query: {
                    courseName: Joi.string().description('课程名字'),
                    department: Joi.string().description('所属院系'),
                    professional: Joi.string().description('专业名字'),
                    className: Joi.string().description('班级名字'),
                    semester: Joi.string().description('学期'),
                    teacherName: Joi.string().description('教师名字'),
                    studentName: Joi.string().description('学生名字'),
                    score: Joi.number().integer().description('分数'),
                    currentPage: Joi.number().integer().description('当前页'),
                    pageSize: Joi.number().integer().description('每页条数')
                }
            }
        }
    }, {
        method: 'GET',
        path: '/score/{scoreId}/view',
        config: {
            handler: viewStudentCourseScoreController.findOneById,
            description: '根据成绩ID获取成绩信息',
            notes: '返回成绩信息',
            tags: ['api'],
            response: {
                // schema: schemaClassModel
            },
            validate: {
                params: {
                    scoreId: Joi.number().integer().required()
                }
            }
        }
    }]
})()
