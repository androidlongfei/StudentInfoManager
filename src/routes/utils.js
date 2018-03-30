'use strict';

var utilsController = require('../controllers/utils');
// const debug = require('debug')('app:routes:utils');

module.exports = (function () {
    return [{
        method: 'GET',
        path: '/app',
        config: {
            handler: utilsController.getAppInfo,
            description: '获取app信息',
            notes: '返回 app 信息',
            tags: ['api'],
            response: {
                schema: null
            }
        }
    }, {
        method: 'GET',
        path: '/departments',
        config: {
            handler: utilsController.getDepartmentInfo,
            description: '获取院系信息',
            notes: '返回departments信息',
            tags: ['api'],
            response: {
                schema: null
            }
        }
    }, {
        method: 'GET',
        path: '/professionals',
        config: {
            handler: utilsController.getProfessionalInfo,
            description: '获取专业信息',
            notes: '返回professional信息',
            tags: ['api'],
            response: {
                schema: null
            }
        }
    }];
}());
