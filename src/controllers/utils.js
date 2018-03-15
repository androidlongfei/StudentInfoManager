'use strict';

const debug = require('debug')('app:controllers:utils');
const async = require('async');
const _ = require('underscore');
const jwt = require('jsonwebtoken');
const Boom = require('boom');
const fs = require('fs');

const appInfo = require('../config/app');
const setting = require('../config/setting');
const sampleConfig = require('../config/sample');
const userConfig = require('../config/user');

var utils = {
    getAppInfo: function (request, reply) {
        let appModel = 'prod';
        reply(appInfo[appModel]);
    },
    getConfig: function (request, reply) {
        let config = {
            sample: sampleConfig,
            user: userConfig
        };
        console.log('config', config)
        async.waterfall([ // 处理目标区域文件
            function (cb) {
                let targetRegionFile = [];
                // fs.readdir(setting.targetRegionFileDir, function (err, files) {
                //     // debug(err, status);
                //     if (err) {
                //         config.targetRegionFile = [];
                //     } else {
                //         config.targetRegionFile = files;
                //     }
                //     cb(null);
                // });
                cb(null)
            }
        ], function (err) {
            if (err) {
                let error = Boom.badImplementation();
                error.output.payload.code = 9999;
                error.output.payload.dbError = err;
                error.output.payload.message = '获取配置信息失败';
                reply(err)
            } else {
                reply(config)
            }
        })
    }
};

module.exports = utils;
