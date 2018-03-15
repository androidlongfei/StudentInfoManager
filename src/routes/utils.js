'use strict';

var utilsController = require('../controllers/utils');
const debug = require('debug')('app:routes:utils');

module.exports = function () {
    return [
        {
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
            path: '/config',
            config: {
                handler: utilsController.getConfig,
                description: '获取config信息',
                notes: '返回 config 信息',
                tags: ['api'],
                response: {
                    schema: null
                }
            }
        }
    ];
}();
