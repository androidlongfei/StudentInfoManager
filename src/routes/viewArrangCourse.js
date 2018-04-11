const viewArrangCourseController = require('../controllers/views/viewArrangCourse');
const Joi = require('joi');
// const debug = require('debug')('app:routes:user');

module.exports = (() => {
    return [{
        method: 'GET',
        path: '/arrangCourse/count',
        config: {
            handler: viewArrangCourseController.count,
            description: '根据条件分页获取课程列表',
            notes: '返回课程列表信息',
            tags: ['api'],
            response: {
                // schema: schemaClassModel
            },
            validate: {
                query: {
                    className: Joi.string().description('班级名字'),
                    department: Joi.string().description('所属院系'),
                    teacherName: Joi.string().description('教师名字'),
                    professional: Joi.string().description('专业名字'),
                    courseName: Joi.string().description('课程名字'),
                    semester: Joi.string().description('学期'),
                    currentPage: Joi.number().integer().description('当前页'),
                    pageSize: Joi.number().integer().description('每页条数')
                }
            }
        }
    }, {
        method: 'GET',
        path: '/arrangCourse/{arrangCourseId}/view',
        config: {
            handler: viewArrangCourseController.findOneById,
            description: '根据课程ID获取课程信息',
            notes: '返回课程信息',
            tags: ['api'],
            response: {
                // schema: schemaClassModel
            },
            validate: {
                params: {
                    arrangCourseId: Joi.number().integer().required()
                }
            }
        }
    }]
})()
