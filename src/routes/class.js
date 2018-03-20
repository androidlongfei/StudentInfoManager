var classController = require('../controllers/class');
var Joi = require('joi');
// const debug = require('debug')('app:routes:user');

module.exports = (function () {
    return [{
        method: 'GET',
        path: '/class/{classId}',
        config: {
            handler: classController.findOneById,
            description: '根据班级ID获取班级信息',
            notes: '返回班级信息',
            tags: ['api'],
            response: {
                schema: null
            },
            validate: {
                params: {
                    classId: Joi.number().integer().required()
                }
            }
        }
    }, {
        // 创建班级路由
        method: 'POST',
        path: '/class',
        config: {
            handler: classController.createClass,
            description: '创建班级',
            notes: '返回班级信息',
            tags: ['api'],
            response: {
                // schema: generalUserModel,
            },
            validate: {
                payload: {
                    name: Joi.string().required().required(),
                    note: Joi.string().required(),
                    departmentsNo: Joi.number().integer().required()
                }
            }
        }
    }]
})()
