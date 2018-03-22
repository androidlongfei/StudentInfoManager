'use strict';

// const debug = require('debug')('app:controllers:utils');
// const async = require('async');
// const _ = require('underscore');

const appInfo = require('../config/app');
const departmentsInfo = require('../config/departments');
const professionalInfo = require('../config/professional');

const utils = {
    // 应用信息
    getAppInfo(request, reply) {
        reply(appInfo);
    },
    // 院系信息
    getDepartmentInfo(request, reply) {
        reply(departmentsInfo);
    },
    // 专业信息
    getProfessionalInfo(request, reply) {
        reply(professionalInfo);
    }
};

module.exports = utils;
