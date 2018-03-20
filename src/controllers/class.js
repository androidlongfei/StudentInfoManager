'use strict';

const debug = require('debug')('app:controllers:class');
const async = require('async');
const _ = require('underscore');
const jwt = require('jsonwebtoken');
const Boom = require('boom');
const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

const Class = require('../models/Class');

const setting = require('../config/setting');

const classMethods = {
    // 创建班级
    createClass(request, reply) {
        let postParameter = request.payload
        let newClass = {
            name: postParameter.name,
            note: postParameter.note,
            departmentsNo: postParameter.departmentsNo
        }
        Class.create(newClass).then(function (classModel) {
            let classModelJSON = classModel.toJSON();
            console.log('classModelJSON', classModelJSON);
            reply(classModelJSON);
        }).catch(function (err) {
            // console.log('err', err);
            let error = Boom.notAcceptable('创建班级失败');
            error.output.payload.code = 1004;
            error.output.payload.dbError = err;
            debug('createClass err', err);
            reply(error);
        });
    },
    findOneById(request, reply) {
        async.waterfall([ // 查询班级
            function (cb) {
                findOneClass(request.params.classId, cb);
            }
        ], function (err, result) {
            if (err) {
                reply(err)
            } else {
                reply(result)
            }
        });
    }
};

// 查询一个班级
function findOneClass(id, cb) {
    Class.findOne({
        where: {
            id: parseInt(id)
        }
    }).then(function (classModel) {
        if (!classModel) {
            let error = Boom.notAcceptable('查询班级数据发生错误, 班级不存在');
            error.output.payload.code = 1029;
            cb(error);
        } else {
            cb(null, classModel);
        }
    }).catch(function (err) {
        debug('findOneClass', err);
        let error = Boom.badImplementation();
        error.output.payload.code = 1030;
        error.output.payload.dbError = err;
        error.output.payload.message = '查询班级数据发生错误';
        cb(error);
    })
};

module.exports = classMethods;
